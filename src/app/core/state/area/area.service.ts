import { Injectable } from '@angular/core';
import { remove, update, ID, splice } from '@datorama/akita';


import { Coords, distanceBetween, distanceToSegment } from 'src/app/models';

import { AreaStore } from './area.store';
import { Area, createArea } from './area.model';
import { AreaQuery } from './area.query';

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
    private areasStore: AreaStore,
    private areaQuery: AreaQuery
  ) { }

  deleteActiveArea(): any {
    this.areasStore.remove(this.areaQuery.getActive().id);
  }

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

    this.areasStore.updateActive(area => ({
      ...area,
      boundaries: [
        ...splice(
          area.boundaries,
          this.findInsertIndex(point, area.boundaries),
          0,
          point
        )
      ]
    }));
  }

  /** Returns the index corresponding to the two points forming the closest segment. */
  private findInsertIndex(point: Coords, points: Coords[]): number {
    let insertIndex = 0;
    let distanceToLine = Infinity;
    // Iterate over all couple of following points
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
