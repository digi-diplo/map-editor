import { Injectable } from '@angular/core';

import { remove, update } from '@datorama/akita';

import { AreasStore } from './areas.store';
import { Area, createArea } from './area.model';
import { Coords } from '../../../models/coords';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  constructor(
    private areasStore: AreasStore
  ) { }

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
        ...area.boundaries,
        point
      ]
    }));
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
