/**
 * Render the Markdown guides to branded PDFs.
 *
 *   node scripts/build-docs-pdf.mjs
 *
 * Needs headless Chrome on a debugging port (the script starts one) and
 * python3 with the `markdown` package for the Markdown -> HTML step.
 *
 * Output lands in docs/. Fonts come from the live Adobe Fonts kit, so the PDFs
 * are set in Gelica and Objektiv like the site itself.
 */
import { execFileSync, spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'docs');
const tmpDir = join(root, '.docs-tmp');

const DOCS = [
  {
    md: 'EDITING.md',
    pdf: 'Hedgerow-Editing-Content.pdf',
    title: 'Editing the Hedgerow site',
    subtitle: 'Content',
    number: 'Part one',
  },
  {
    md: 'DESIGN-EDITING.md',
    pdf: 'Hedgerow-Editing-Design.pdf',
    title: 'Changing how the Hedgerow site looks',
    subtitle: 'Design',
    number: 'Part two',
  },
];

const CHROME =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9333;

/* ------------------------------------------------------------------ */
/* Markdown -> HTML                                                     */
/* ------------------------------------------------------------------ */

function renderMarkdown(mdPath) {
  const script = `
import sys, markdown
src = open(sys.argv[1]).read()
# Drop the H1: the cover page already carries the title.
lines = src.split('\\n')
if lines and lines[0].startswith('# '):
    lines = lines[1:]
src = '\\n'.join(lines)
html = markdown.markdown(
    src,
    extensions=['tables', 'fenced_code', 'sane_lists', 'attr_list'],
)
sys.stdout.write(html)
`;
  return execFileSync('python3', ['-c', script, mdPath], {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  });
}

/* ------------------------------------------------------------------ */
/* Page shell                                                           */
/* ------------------------------------------------------------------ */

const today = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
}).format(new Date());

function shell({ title, subtitle, number, body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
<link rel="stylesheet" href="https://use.typekit.net/wde0fbj.css">
<style>
  :root {
    --violet: #9933FF;
    --midnight: #330066;
    --paper: #E1E8D5;
    --mint: #CCFFCC;
    --cream: #FFFFCC;
    --frameset: #D4DCC6;
    --yellow: #FFCC00;
    --grey: #666666;
    --serif: "gelica", Georgia, "Times New Roman", serif;
    --sans: "objektiv-mk1", system-ui, sans-serif;
    --mono: "Courier New", Courier, monospace;
  }

  @page {
    size: Letter;
    margin: 16mm 18mm 20mm;
  }

  * { box-sizing: border-box; }

  body {
    font-family: var(--sans);
    font-size: 10.5pt;
    line-height: 1.6;
    color: var(--midnight);
    margin: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ---------- cover ---------- */

  .cover {
    page-break-after: always;
    height: 232mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 4mm 0 0;
  }

  .cover__mark {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .cover__word {
    font-family: "modulator-text-vf", var(--sans);
    font-weight: 400;
    font-variation-settings: 'wdth' 100;
    font-size: 26pt;
    letter-spacing: 0.06em;
    color: var(--violet);
    line-height: 1;
  }

  .cover__middle { padding-bottom: 8mm; }

  .cover__kicker {
    font-size: 9pt;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--grey);
    margin: 0 0 6mm;
  }

  .cover__title {
    font-family: var(--serif);
    font-weight: 600;
    font-size: 34pt;
    line-height: 1.05;
    margin: 0 0 6mm;
    max-width: 150mm;
  }

  .cover__sub {
    font-family: var(--serif);
    font-style: italic;
    font-size: 15pt;
    color: var(--violet);
    margin: 0;
  }

  .cover__foot {
    border-top: 2px solid var(--midnight);
    padding-top: 4mm;
    font-size: 9.5pt;
    color: var(--grey);
    display: flex;
    justify-content: space-between;
    gap: 10mm;
  }

  /* ---------- flow ---------- */

  h2 {
    font-family: var(--serif);
    font-weight: 600;
    font-size: 19pt;
    line-height: 1.15;
    margin: 11mm 0 3mm;
    padding-top: 3mm;
    border-top: 2px solid var(--midnight);
    page-break-after: avoid;
    break-after: avoid;
  }

  h2:first-of-type { margin-top: 0; }

  h3 {
    font-family: var(--serif);
    font-weight: 500;
    font-size: 13.5pt;
    margin: 7mm 0 2mm;
    page-break-after: avoid;
    break-after: avoid;
  }

  p { margin: 0 0 3.2mm; }

  a { color: var(--violet); text-decoration: none; }

  strong { font-weight: 700; }

  ul, ol { margin: 0 0 3.2mm; padding-left: 6mm; }
  li { margin-bottom: 1.4mm; }
  li > ul, li > ol { margin-top: 1.4mm; }

  hr {
    border: 0;
    border-top: 1px solid rgba(51, 0, 102, 0.25);
    margin: 7mm 0;
  }

  /* ---------- code ---------- */

  code {
    font-family: var(--mono);
    font-size: 9pt;
    background: var(--frameset);
    padding: 0.5mm 1.2mm;
    border-radius: 2px;
  }

  pre {
    background: var(--cream);
    border: 1.5px solid var(--midnight);
    border-radius: 4px;
    padding: 3.5mm 4mm;
    margin: 0 0 4mm;
    overflow-x: auto;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  pre code {
    background: none;
    padding: 0;
    font-size: 8.6pt;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
  }

  /* ---------- tables ---------- */

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 4.5mm;
    font-size: 9.3pt;
    border: 1.5px solid var(--midnight);
    page-break-inside: avoid;
    break-inside: avoid;
  }

  thead { background: var(--midnight); color: var(--cream); }

  th {
    text-align: left;
    padding: 2mm 2.5mm;
    font-weight: 700;
  }

  td {
    padding: 2mm 2.5mm;
    border-top: 1px solid rgba(51, 0, 102, 0.2);
    vertical-align: top;
  }

  tbody tr:nth-child(odd) { background: var(--paper); }

  td code { background: rgba(255, 255, 255, 0.6); }

  /* ---------- blockquote ---------- */

  blockquote {
    margin: 0 0 4mm;
    padding: 0 0 0 4mm;
    border-left: 3px solid var(--violet);
  }

  blockquote p {
    font-family: var(--serif);
    font-style: italic;
    color: var(--violet);
    margin: 0;
  }

  /* Keep a heading with the paragraph under it. */
  h2 + p, h3 + p, h2 + ul, h3 + ul, h2 + table, h3 + table {
    page-break-before: avoid;
    break-before: avoid;
  }
</style>
</head>
<body>
  <section class="cover">
    <div class="cover__mark">
      <svg width="30" height="30" viewBox="0 0 16 16" shape-rendering="crispEdges" role="img" aria-label="Hedgerow">
        <rect width="16" height="16" fill="#CCFFCC"/>
        <rect x="1" y="1" width="6" height="14" rx="1" fill="#9933FF"/>
        <rect x="9" y="1" width="6" height="14" rx="1" fill="#9933FF"/>
        <rect x="2" y="7" width="12" height="2" fill="#FFFFCC"/>
      </svg>
      <span class="cover__word">Hedgerow</span>
    </div>

    <div class="cover__middle">
      <p class="cover__kicker">${number} &middot; ${subtitle}</p>
      <h1 class="cover__title">${title}</h1>
      <p class="cover__sub">Cultivating digital work that matters.</p>
    </div>

    <div class="cover__foot">
      <span>hedgerowdigital.com</span>
      <span>${today}</span>
    </div>
  </section>

  ${body}
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/* Chrome                                                              */
/* ------------------------------------------------------------------ */

async function cdp(ws, method, params = {}) {
  return new Promise((resolve) => {
    const id = ++cdp.id;
    cdp.pending.set(id, resolve);
    ws.send(JSON.stringify({ id, method, params }));
  });
}
cdp.id = 0;
cdp.pending = new Map();

async function printToPdf(fileUrl, outPath) {
  const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const target =
    targets.find((t) => t.type === 'page') ??
    (await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`)).json());

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  const loaded = new Promise((resolve) => {
    ws.addEventListener('message', (e) => {
      const m = JSON.parse(e.data);
      if (m.id && cdp.pending.has(m.id)) {
        cdp.pending.get(m.id)(m.result);
        cdp.pending.delete(m.id);
      }
      if (m.method === 'Page.loadEventFired') resolve();
    });
  });

  await new Promise((r) => ws.addEventListener('open', r));
  await cdp(ws, 'Page.enable');
  await cdp(ws, 'Page.navigate', { url: fileUrl });
  await loaded;
  // Let the webfonts settle before measuring page breaks.
  await new Promise((r) => setTimeout(r, 3500));

  const { data } = await cdp(ws, 'Page.printToPDF', {
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `
      <div style="width:100%;font-family:system-ui,sans-serif;font-size:8pt;
                  color:#666666;padding:0 18mm;display:flex;
                  justify-content:space-between;">
        <span>Hedgerow Digital</span>
        <span class="pageNumber"></span>
      </div>`,
  });

  writeFileSync(outPath, Buffer.from(data, 'base64'));
  ws.close();
}

/* ------------------------------------------------------------------ */

mkdirSync(outDir, { recursive: true });
mkdirSync(tmpDir, { recursive: true });

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${join(tmpDir, 'profile')}`,
    'about:blank',
  ],
  { stdio: 'ignore', detached: true },
);

// Wait for the debugging endpoint.
for (let i = 0; i < 40; i++) {
  try {
    await fetch(`http://127.0.0.1:${PORT}/json/version`);
    break;
  } catch {
    await new Promise((r) => setTimeout(r, 500));
  }
}

for (const doc of DOCS) {
  const body = renderMarkdown(join(root, doc.md));
  const htmlPath = join(tmpDir, doc.md.replace(/\.md$/, '.html'));
  writeFileSync(htmlPath, shell({ ...doc, body }));

  const outPath = join(outDir, doc.pdf);
  await printToPdf(`file://${htmlPath}`, outPath);

  const kb = Math.round(readFileSync(outPath).length / 1024);
  console.log(`${doc.pdf.padEnd(34)} ${String(kb).padStart(4)} KB`);
}

console.log(`\nWritten to docs/`);

try {
  process.kill(-chrome.pid, 'SIGTERM');
} catch {
  // Already gone.
}

// Chrome holds its profile directory open for a moment after SIGTERM, so give
// it time before removing the scratch dir. A failed cleanup must not fail the
// build: the PDFs are already written by this point.
await new Promise((r) => setTimeout(r, 1500));
try {
  rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
} catch {
  console.warn(`(left ${tmpDir} behind — it is gitignored and safe to delete)`);
}
