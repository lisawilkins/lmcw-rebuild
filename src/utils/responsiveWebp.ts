export type ImageRoot = 'nbc' | 'home' | 'strategy';

const DENSITIES = ['1x', '2x', '3x', '4x'] as const;

export type WebpDensity = (typeof DENSITIES)[number];

/** Responsive WebP asset in a `{name}_{density}.webp` folder. */
export function responsiveWebp(
  root: ImageRoot,
  folder: string,
  defaultDensity: WebpDensity = '2x',
) {
  const prefix = `/images/${root}/${folder}`;
  return {
    src: `${prefix}/${folder}_${defaultDensity}.webp`,
    srcset: DENSITIES.map((d) => `${prefix}/${folder}_${d}.webp ${d}`).join(', '),
  };
}

/** CSS `image-set()` for hero/background images with WebP + PNG fallback. */
export function webpBackgroundImageSet(
  root: ImageRoot,
  folder: string,
  pngFallback: string,
) {
  const prefix = `/images/${root}/${folder}`;
  return `image-set(
    url('${prefix}/${folder}_1x.webp') type('image/webp') 1x,
    url('${prefix}/${folder}_2x.webp') type('image/webp') 2x,
    url('${pngFallback}') type('image/png') 1x
  )`;
}
