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
  editorHistory = new StateHistoryPlugin(this.editorQuery, { maxAge: 20 });

  constructor(
    private store: EditorStore,
    private editorQuery: EditorQuery,
    private areaService: AreaService,
    private areaQuery: AreaQuery,
  ) {
    this.editorQuery.isAddingPoint().subscribe(v => this.isAddingPoints = v);
  }

  setDebugState(active: boolean) {
    this.store.setState(state => ({
      ...state,
      debugMode: active
    }));
  }

  deleteActiveArea(): void {
    this.areaService.deleteActiveArea();
    this.setEditorTool(EditorAction.SelectingArea);
  }

  resetMap() {
    this.areaService.resetState();
    this.setEditorTool(EditorAction.SelectingArea);
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
    this.areaService.addDumyArea();
  }

  selectArea(areaID: ID) {
    this.areaService.selectArea(areaID);
  }

  useMovingTool() {
    this.setEditorTool(EditorAction.MovingPoint);
  }

  useGrabTool() {
    this.setEditorTool(EditorAction.GrabbingPoint);
  }

  useSelectTool() {
    this.setEditorTool(EditorAction.SelectingArea);
  }

  usePointAddTool() {
    if (this.areaQuery.hasActiveEntity) {
      this.setEditorTool(EditorAction.AddingPoint);
    }
  }

  private setEditorTool(action: EditorAction) {
    console.log(action);
    this.store.setState(state => ({ ...state, currentAction: action }));
  }

  addPoint(point: Coords) {
    if (this.isAddingPoints) {
      this.areaService.addPointToActiveArea(point);
    }
  }
}
