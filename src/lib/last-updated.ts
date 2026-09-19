/**
 * "Last updated" dates, resolved at build time.
 *
 * Order of truth:
 *   1. the page's `updated` frontmatter, when the author set one
 *   2. the file's last git commit date
 *   3. the build date
 *
 * Step 2 is the interesting one. Vercel checks out with a shallow clone, so
 * `git log` knows about very few commits and returns nothing for most files.
 * That is expected, not an error: we fall through quietly and print one
 * summary at the end of the build naming the pages that had to guess.
 */
import { execFileSync } from 'node:child_process';

/** One Date per file path; null means "asked git, got nothing". */
const cache = new Map<string, Date | null>();

/** Files that fell all the way through to the build date. */
const fallbacks = new Set<string>();

/** Set once on the first call: is there usable git history here at all? */
let gitUsable: boolean | undefined;

/** Frozen at module load so every fallback on one build agrees. */
const buildDate = new Date();

function checkGitUsable(): boolean {
  try {
    execFileSync('git', ['rev-parse', '--is-inside-work-tree'], {
      stdio: ['ignore', 'pipe', 'ignore'],
      encoding: 'utf8',
    });
    return true;
  } catch {
    // Not a repository, or git is not installed. Either way, skip it.
    return false;
  }
}

/**
 * The last commit date for a file, or null when git cannot say — the file is
 * untracked, or its history was truncated by a shallow clone.
 */
export function gitLastModified(filePath: string): Date | null {
  const cached = cache.get(filePath);
  if (cached !== undefined) return cached;

  gitUsable ??= checkGitUsable();
  if (!gitUsable) {
    cache.set(filePath, null);
    return null;
  }

  let result: Date | null = null;
  try {
    const stdout = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', filePath],
      { stdio: ['ignore', 'pipe', 'ignore'], encoding: 'utf8' },
    ).trim();

    if (stdout) {
      const parsed = new Date(stdout);
      if (!Number.isNaN(parsed.getTime())) result = parsed;
    }
  } catch {
    // A failed `git log` is not worth failing a build over.
  }

  cache.set(filePath, result);
  return result;
}

/**
 * Resolve the date to stamp on a page.
 *
 * @param frontmatter the entry's `updated` value, if it has one
 * @param filePath    path to the source file, relative to the project root
 */
export function resolveUpdated(
  frontmatter: Date | undefined,
  filePath: string | undefined,
): Date {
  if (frontmatter instanceof Date) return frontmatter;

  if (filePath) {
    const fromGit = gitLastModified(filePath);
    if (fromGit) return fromGit;
  }

  const key = filePath ?? '(unknown file)';
  if (!fallbacks.has(key)) {
    fallbacks.add(key);
    // Warn as it happens rather than in a summary: page modules and the build
    // hooks do not share module state, so a deferred report may never run.
    console.warn(
      `[last-updated] ${key}: no frontmatter date and no git history — ` +
        `stamped with the build date. On Vercel this is usually the shallow ` +
        `clone; set an \`updated\` date in frontmatter to be certain.`,
    );
  }
  return buildDate;
}

/**
 * Print one line per page that could not find a real date. Call once, late in
 * the build — a silent wrong date is worse than a noisy right one.
 */
export function reportFallbacks(): void {
  if (fallbacks.size === 0) return;

  const files = [...fallbacks].sort();
  console.warn(
    `\n[last-updated] ${files.length} file(s) had no frontmatter date and no ` +
      `git history, so they are stamped with the build date:\n` +
      files.map((f) => `  - ${f}`).join('\n') +
      `\n  On Vercel this is usually the shallow clone. Set an \`updated\` ` +
      `date in frontmatter to be certain.\n`,
  );
}
