export interface Coords {
  x: number;
  y: number;
}

export interface Line {
  p1: Coords;
  p2: Coords;
}

export function distanceBetween(a: Coords, b: Coords): number {
  return Math.sqrt(
    Math.pow(b.x - a.x, 2)
    + Math.pow(b.y - a.y, 2)
  );
}

export function distanceToSegment(p: Coords, segment: Line): number {
  return Math.sqrt(distToSegmentSquared(p, segment.p1, segment.p2));
}

function square(x: number): number {
  return x * x;
}

function distanceSquared(v: Coords, w: Coords): number {
  return square(v.x - w.x) + square(v.y - w.y);
}

function distToSegmentSquared(p: Coords, v: Coords, w: Coords): number {
  const l2 = distanceSquared(v, w);

  if (l2 === 0) {
    return distanceSquared(p, v);
  }

  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));

  return distanceSquared(p, {
    x: v.x + t * (w.x - v.x),
    y: v.y + t * (w.y - v.y)
  });
}

