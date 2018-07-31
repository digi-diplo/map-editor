import { Injectable } from '@angular/core';
import { push, remove, update } from '@datorama/akita';

import { AreasStore } from './areas.store';
import { AreasDataService } from './areas-data.service';
import { Area, TerrainType, AreaType, createArea } from './area.model';
import { AreasQuery } from './areas.query';
import { Coords } from '../models/Coords';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  constructor(
    private areasStore: AreasStore,
    private areasDataService: AreasDataService,
    private areasQuery: AreasQuery
  ) { }

  get() {
    // this.areasDataService.get().subscribe((entities: ServerResponse) => {
    // this.areasStore.set(entities);
    // });
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

  addPointToActiveRegion(point: Coords) {
    console.log('Adding point');
    this.areasStore.updateActive(area => ({
      ...area,
      regions: [
        ...area.regions.map((reg, id) => id === 0 ? { ...reg, points: push(reg.points, point) } : reg)
      ]
    }));
  }

  removePointToActiveRegion(index: number) {
    console.log('Removing point');
    this.areasStore.updateActive(area => ({
      ...area,
      regions: [
        ...area.regions.map((reg, id) => id === 0 ? { ...reg, points: remove(reg.points, index) } : reg)
      ]
    }));
  }

  movePointFromActiveRegion(index: number, newPos: Coords) {
    console.log('Moving point');
    this.areasStore.updateActive(area => ({
      ...area,
      regions: [
        ...area.regions.map((reg, id) => id === 0
          ? { ...reg, points: update(reg.points, index, newPos) }
          : reg
        )
      ]
    }));
  }
}
