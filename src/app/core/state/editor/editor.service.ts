import { Injectable } from '@angular/core';
import { ID, StateHistoryPlugin } from '@datorama/akita';

import { EditorStore } from './editor.store';
import { EditorAction } from './editor.model';
import { AreaService } from '../area/area.service';
import { Coords } from '../../../models';
import { EditorQuery } from './editor.query';
import { AreaQuery } from '../area/area.query';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  isAddingPoints = false;
  history = new StateHistoryPlugin(this.areaQuery, { maxAge: 20 });
  editorHistory = new StateHistoryPlugin(this.editoreQuery, { maxAge: 20 });

  constructor(
    private store: EditorStore,
    private editoreQuery: EditorQuery,
    private areaService: AreaService,
    private areaQuery: AreaQuery,
    private editorQuery: EditorQuery
  ) {
    this.editoreQuery.isAddingPoint().subscribe(v => this.isAddingPoints = v);
  }

  undo() {
    this.history.undo();
    this.editorHistory.undo();
  }

  redo() {
    this.history.redo();
    this.editorHistory.redo();
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
