export type Point2D = {
  x: number;
  y: number;
};

export type Size2D = {
  width: number;
  height: number;
};

export function calculateAspectRatioFit(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
): Size2D {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
}

export function calculateCenterOffset(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
): Point2D {
  return {
    x: Math.round(Math.abs(maxWidth - srcWidth) / 2),
    y: Math.round(Math.abs(maxHeight - srcHeight) / 2),
  };
}
