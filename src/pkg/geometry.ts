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

export function getPolygonPath(count: number): number[] {
  const result: number[] = [];
  const startAngle = 0; //Math.PI / 2;

  for (let i = 0; i < count; i++) {
    result.push(Math.cos((startAngle + 2 * Math.PI * i) / count));
    result.push(Math.sin((startAngle + 2 * Math.PI * i) / count));
  }

  return result;
}
