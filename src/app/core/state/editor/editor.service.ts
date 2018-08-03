import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';

import { EditorStore } from './editor.store';
import { EditorAction } from './editor.model';
import { AreaService } from '../area/area.service';
import { Coords } from '../../../models';
import { EditorQuery } from './editor.query';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  isAddingPoints = false;
  constructor(
    private store: EditorStore,
    private editoreQuery: EditorQuery,
    private areaService: AreaService
  ) {
    this.editoreQuery.isAddingPoint().subscribe(v => this.isAddingPoints = v);
  }

  createNewArea() {
    this.setEditorTool(EditorAction.AddingPoint);
    console.log('lol');
    this.areaService.addDumyArea();
  }

  selectArea(areaID: ID) {
    this.areaService.selectArea(areaID);
    this.setAddingPoint();
  }

  setGrabbing() {
    this.setEditorTool(EditorAction.MovingPoint);
  }

  setGrab() {
    this.setEditorTool(EditorAction.GrabbingPoint);
  }

  setSelect() {
    this.setEditorTool(EditorAction.SelectingArea);
  }

  setAddingPoint() {
    this.setEditorTool(EditorAction.AddingPoint);
  }

  // Celle la, elle marche quand elle veut
  setEditorTool(action: EditorAction) {
    console.log(action);
    this.store.setState(state => ({ ...state, currentAction: action }));
  }

  addPoint(point: Coords) {
    if (this.isAddingPoints) {
      this.areaService.addPointToActiveArea(point);
    }
  }
}
