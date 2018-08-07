import { Injectable } from '@angular/core';
import { remove, update, ID, splice } from '@datorama/akita';


import { Coords, distanceBetween, distanceToSegment } from 'src/app/models';

import { AreaStore } from './area.store';
import { Area, createArea } from './area.model';

export interface Line {
  p1: Coords;
  p2: Coords;
}

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  cursorAddingPoints: boolean;

  constructor(
    private areasStore: AreaStore
  ) { }

  selectArea(areaID: ID) {
    this.areasStore.setActive(areaID);
  }

  resetActive() {
    this.areasStore.setActive(null);
  }

  resetState() {
    this.areasStore.set([]);
  }

  addDumyArea() {
    const id = Math.random();
    this.areasStore.add(createArea({ id, regions: [{ points: [] }] }));
    this.areasStore.setActive(id);
  }

  add(area: Area) {
    this.areasStore.add(area);
  }

  addPointToActiveArea(point: Coords) {
    console.log('Adding point');

    this.areasStore.updateActive(area => {
      const closestPointIndex = this.findInsertIndex(point, area.boundaries);
      return {
        ...area,
        boundaries: [
          ...splice(area.boundaries, closestPointIndex, 0, point)
        ]
      };
    });
  }

  /** Returns the index of the closest point. */
  private findInsertIndex(point: Coords, points: Coords[]): number {
    let insertIndex = 0;
    let distanceToLine = Infinity;

    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      const secIndex = i + 1 < points.length ? i + 1 : 0;
      const p2 = points[secIndex];
      const actualDistance = distanceToSegment(point, { p1, p2 });

      if (actualDistance < distanceToLine) {
        distanceToLine = actualDistance;
        insertIndex = secIndex;
      }
    }
    return insertIndex;
  }

  // private distanceToLine(point: Coords, line: Line): number {
  //   return Math.abs((line.p2.y - line.p1.y) * point.x - (line.p2.x - line.p1.x) * point.y + line.p2.x * line.p1.y - line.p2.y * line.p1.x)
  //     / Math.sqrt(Math.pow(line.p2.y - line.p1.y, 2) + Math.pow(line.p2.x - line.p1.x, 2));
  // }

  removePointToActiveRegion(index: number) {
    console.log('Removing point');
    this.areasStore.updateActive(area => ({
      ...area,
      boundaries: [
        ...remove(area.boundaries, index)
      ]
    }));
  }

  movePointFromActiveRegion(index: number, newPos: Coords) {
    console.log('Moving point');
    this.areasStore.updateActive(area => ({
      ...area,
      boundaries: [
        ...update(area.boundaries, index, newPos)
      ]
    }));
  }
}
