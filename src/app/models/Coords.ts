export interface Coords {
  x: number;
  y: number;
}

export function distanceBetween(a: Coords, b: Coords): number {
  return Math.sqrt(
    Math.pow(b.x - a.x, 2)
    + Math.pow(b.y - a.y, 2)
  );
}
