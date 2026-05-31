export type Photo = {
  id: string;
  /** Folder under /images/photos/ for full-size images (e.g. "01"). */
  folder: string;
  /** Folder under /images/photos/ for square thumbnails (e.g. "01_sq", "15sq"). */
  sqFolder: string;
  /** Filename prefix inside each folder (e.g. "01_sq", "15sq"). */
  sqPrefix: string;
  /** Filename prefix for full-size images (e.g. "01"). */
  prefix: string;
};

/** Gallery photos 01–27. Photo 15 uses the legacy `15sq` folder naming. */
export const PHOTOS: Photo[] = Array.from({ length: 27 }, (_, index) => {
  const id = String(index + 1).padStart(2, '0');
  const isLegacySq = id === '15';
  const sqFolder = isLegacySq ? '15sq' : `${id}_sq`;
  const sqPrefix = isLegacySq ? '15sq' : `${id}_sq`;

  return {
    id,
    folder: id,
    sqFolder,
    sqPrefix,
    prefix: id,
  };
});

export function photoSrcset(folder: string, prefix: string): string {
  const base = `/images/photos/${folder}/${prefix}`;
  return `${base}_1x.webp 1x, ${base}_2x.webp 2x, ${base}_3x.webp 3x`;
}

export function photoSrc(folder: string, prefix: string, density: '1x' | '2x' | '3x' = '2x'): string {
  return `/images/photos/${folder}/${prefix}_${density}.webp`;
}
