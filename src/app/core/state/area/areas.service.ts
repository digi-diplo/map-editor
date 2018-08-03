import { Injectable } from '@angular/core';
import { remove, update, ID } from '@datorama/akita';


import { Coords } from 'src/app/models';
import { EditorQuery } from '../editor/editor.query';

import { AreasStore } from './areas.store';
import { Area, createArea } from './area.model';

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  cursorAddingPoints: boolean;

  constructor(
    private areasStore: AreasStore,
    editorQuery: EditorQuery
  ) {
    editorQuery.addingPoints().subscribe(b => this.cursorAddingPoints = b);
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
    if (this.cursorAddingPoints) {
      console.log('Adding point');
      this.areasStore.updateActive(area => ({
        ...area,
        boundaries: [
          ...area.boundaries,
          point
        ]
      }));
    }
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
