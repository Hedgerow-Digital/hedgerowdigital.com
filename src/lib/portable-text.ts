/**
 * The small amount of logic a portable-text renderer needs.
 *
 * Portable text arrives as a flat array: list items are ordinary blocks that
 * happen to carry a `listItem` and a `level`. Rendering them as HTML means
 * grouping consecutive items back into <ul>/<ol> runs, which is what this file
 * does. Everything else is a straight mapping handled in PortableText.astro.
 */

export interface PortableTextSpan {
  _type: 'span';
  _key?: string;
  text?: string;
  marks?: string[];
}

export interface PortableTextMarkDef {
  _key: string;
  _type: string;
  href?: string;
}

export interface PortableTextBlock {
  _type: string;
  _key?: string;
  style?: string;
  listItem?: 'bullet' | 'number';
  level?: number;
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
  /** Image blocks resolved in the GROQ query. */
  url?: string;
  alt?: string;
  caption?: string;
}

export type RenderNode =
  | { kind: 'block'; block: PortableTextBlock }
  | { kind: 'list'; listItem: 'bullet' | 'number'; items: PortableTextBlock[] };

/**
 * Collapse consecutive list-item blocks into single list nodes, leaving
 * everything else untouched and in order.
 *
 * Nested levels are flattened to one list: the studio's posts do not use them,
 * and a wrong nesting guess reads worse than a flat list.
 */
export function groupBlocks(blocks: PortableTextBlock[]): RenderNode[] {
  const nodes: RenderNode[] = [];

  for (const block of blocks) {
    const listItem = block.listItem;

    if (listItem === 'bullet' || listItem === 'number') {
      const previous = nodes[nodes.length - 1];
      if (previous?.kind === 'list' && previous.listItem === listItem) {
        previous.items.push(block);
      } else {
        nodes.push({ kind: 'list', listItem, items: [block] });
      }
      continue;
    }

    nodes.push({ kind: 'block', block });
  }

  return nodes;
}

/** Heading styles Sanity's default block editor can produce. */
const HEADING_TAGS: Record<string, string> = {
  h1: 'h2', // never a second <h1>: the page title owns that
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
};

export function blockTag(block: PortableTextBlock): string {
  const style = block.style ?? 'normal';
  if (style === 'blockquote') return 'blockquote';
  return HEADING_TAGS[style] ?? 'p';
}

/** Resolve a span's `marks` into decorators and the link it belongs to. */
export function resolveMarks(
  span: PortableTextSpan,
  markDefs: PortableTextMarkDef[] | undefined,
): { decorators: string[]; href: string | undefined } {
  const decorators: string[] = [];
  let href: string | undefined;

  for (const mark of span.marks ?? []) {
    const def = markDefs?.find((candidate) => candidate._key === mark);
    if (def) {
      if (def._type === 'link' && def.href) href = def.href;
      continue;
    }
    decorators.push(mark);
  }

  return { decorators, href };
}
