/**
 * Pixel icon grids.
 *
 * Each icon is an array of equal-length strings, one character per pixel.
 * A character maps to a brand colour through PALETTE; anything unmapped
 * (conventionally ".") is transparent.
 *
 *   M  Dial-Up Midnight    V  Visited Link      N  Web-Safe Mint
 *   C  Tooltip Cream       Y  Under Construction  O  Hit Counter
 *
 * favicon, magnifier, page, monitor, sprout, envelope and folder are taken
 * verbatim from the Web 1.0 details demo in "Design Reference". clock, check,
 * arrowL and arrowR are drawn to match — the mockups reference them but no
 * source file defines them.
 *
 * Scale by whole numbers only, and never smooth them.
 */

export const PALETTE: Record<string, string> = {
  M: '#330066',
  V: '#9933FF',
  N: '#CCFFCC',
  C: '#FFFFCC',
  Y: '#FFCC00',
  O: '#FF6633',
};

export const PIXEL_ICONS = {
  /** The Hedgerow H: two violet fields with a cream channel between them. */
  favicon: [
    'NNNNNNNNNNNNNNNN',
    'NNVVVVVNNVVVVVNN',
    'NVVVVVVNNVVVVVVN',
    'NVVVVVVNNVVVVVVN',
    'NVVVVVVNNVVVVVVN',
    'NVVVVVVNNVVVVVVN',
    'NVVVVVVVVVVVVVVN',
    'NVVCCCCCCCCCCVVN',
    'NVVCCCCCCCCCCVVN',
    'NVVVVVVVVVVVVVVN',
    'NVVVVVVNNVVVVVVN',
    'NVVVVVVNNVVVVVVN',
    'NVVVVVVNNVVVVVVN',
    'NVVVVVVNNVVVVVVN',
    'NNVVVVVNNVVVVVNN',
    'NNNNNNNNNNNNNNNN',
  ],
  magnifier: [
    '................',
    '....MMMMM.......',
    '...MCCCCCM......',
    '..MCCNNCCCM.....',
    '..MCNCCCCCM.....',
    '..MCCCCCCCM.....',
    '..MCCCCCCCM.....',
    '...MCCCCCM......',
    '....MMMMMVV.....',
    '.........VVV....',
    '..........VVV...',
    '...........VVV..',
    '............VVV.',
    '.............VV.',
    '................',
    '................',
  ],
  page: [
    '................',
    '..MMMMMMMM......',
    '..MCCCCCCMM.....',
    '..MCCCCCCMCM....',
    '..MCCCCCCMMMM...',
    '..MCVVVVVVCCM...',
    '..MCCCCCCCCCM...',
    '..MCVVVVVVVCM...',
    '..MCCCCCCCCCM...',
    '..MCVVVVVCCCM...',
    '..MCCCCCCCCCM...',
    '..MCVVVVVVVCM...',
    '..MCCCCCCCCCM...',
    '..MMMMMMMMMMM...',
    '................',
    '................',
  ],
  monitor: [
    '................',
    '.MMMMMMMMMMMMMM.',
    '.MNNNNNNNNNNNNM.',
    '.MNVVNNNNNNNNNM.',
    '.MNVVNNYYYYYNNM.',
    '.MNNNNNNNNNNNNM.',
    '.MNNNNNYYYYNNNM.',
    '.MNVVVVVVVNNNNM.',
    '.MNNNNNNNNNNNNM.',
    '.MMMMMMMMMMMMMM.',
    '......MMMM......',
    '......MMMM......',
    '....MMMMMMMM....',
    '................',
    '................',
    '................',
  ],
  sprout: [
    '................',
    '.VVVV......VVVV.',
    'VVVVVV....VVVVVV',
    '.VVVVVV..VVVVVV.',
    '...VVVVMMVVVV...',
    '.......MM.......',
    '.......MM.......',
    '.......MM.......',
    '.......MM.......',
    '...MMMMMMMMMM...',
    '...MYYYYYYYYM...',
    '...MMMMMMMMMM...',
    '....MYYYYYYM....',
    '....MYYYYYYM....',
    '....MMMMMMMM....',
    '................',
  ],
  /** 16x10, not square — sized for a footer mailto line. */
  envelope: [
    'MMMMMMMMMMMMMMMM',
    'MMCCCCCCCCCCCCMM',
    'MCMCCCCCCCCCCMCM',
    'MCCMCCCCCCCCMCCM',
    'MCCCMCCCCCCMCCCM',
    'MCCCCMCCCCMCCCCM',
    'MCCCCCMMMMCCCCCM',
    'MCCCCCCCCCCCCCCM',
    'MCCCCCCCCCCCCCCM',
    'MMMMMMMMMMMMMMMM',
  ],
  folder: [
    '................',
    '................',
    '..MMMMM.........',
    '.MYYYYYM........',
    '.MYYYYYYMMMMMMM.',
    '.MYYYYYYYYYYYYM.',
    '.MYYYYYYYYYYYYM.',
    '.MYYYYYYYYYYYYM.',
    '.MYYYYYYYYYYYYM.',
    '.MYYYYYYYYYYYYM.',
    '.MYYYYYYYYYYYYM.',
    '.MMMMMMMMMMMMMM.',
    '................',
    '................',
    '................',
    '................',
  ],
  /** Drawn for this build: "last updated" stamps and next-start dates. */
  clock: [
    '................',
    '................',
    '.....MMMMMM.....',
    '...MMCCCCCCMM...',
    '..MCCCCCCCCCCM..',
    '..MCCCCMCCCCCM..',
    '.MCCCCCMCCCCCCM.',
    '.MCCCCCMCCCCCCM.',
    '.MCCCCCMMMMCCCM.',
    '.MCCCCCCCCCCCCM.',
    '..MCCCCCCCCCCM..',
    '..MCCCCCCCCCCM..',
    '...MMCCCCCCMM...',
    '.....MMMMMM.....',
    '................',
    '................',
  ],
  /** Drawn for this build: "what you get" lists. */
  check: [
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '............VV..',
    '...........VV...',
    '..........VV....',
    '...VV....VV.....',
    '....VV..VV......',
    '.....VVVV.......',
    '......VV........',
    '................',
    '................',
    '................',
  ],
  /** Drawn for this build: the webring prev/next bar. */
  arrowL: [
    '................',
    '................',
    '................',
    '................',
    '......V.........',
    '.....VV.........',
    '....VVV.........',
    '...VVVVVVVVVV...',
    '...VVVVVVVVVV...',
    '....VVV.........',
    '.....VV.........',
    '......V.........',
    '................',
    '................',
    '................',
    '................',
  ],
  arrowR: [
    '................',
    '................',
    '................',
    '................',
    '.........V......',
    '.........VV.....',
    '.........VVV....',
    '...VVVVVVVVVV...',
    '...VVVVVVVVVV...',
    '.........VVV....',
    '.........VV.....',
    '.........V......',
    '................',
    '................',
    '................',
    '................',
  ],
} as const satisfies Record<string, readonly string[]>;

export type PixelIconName = keyof typeof PIXEL_ICONS;

export const PIXEL_ICON_NAMES = Object.keys(PIXEL_ICONS) as [
  PixelIconName,
  ...PixelIconName[],
];

/**
 * Build the <rect> body and viewBox for an icon.
 * Throws on a ragged grid so a mistyped row fails the build, not the page.
 */
export function pixelIconPaths(name: PixelIconName): {
  rects: string;
  width: number;
  height: number;
} {
  const rows = PIXEL_ICONS[name] as readonly string[];
  const width = rows[0]!.length;
  const height = rows.length;

  let rects = '';
  rows.forEach((row, y) => {
    if (row.length !== width) {
      throw new Error(
        `Pixel icon "${name}" row ${y} is ${row.length} chars, expected ${width}.`,
      );
    }
    [...row].forEach((char, x) => {
      const fill = PALETTE[char];
      if (fill) {
        rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${fill}"/>`;
      }
    });
  });

  return { rects, width, height };
}

/** A standalone SVG document string — used for the favicon endpoint. */
export function pixelIconSvg(name: PixelIconName, size = 32): string {
  const { rects, width, height } = pixelIconPaths(name);
  const scaledHeight = Math.round((size * height) / width);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${scaledHeight}" ` +
    `viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges">${rects}</svg>`
  );
}
