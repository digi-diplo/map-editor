import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';

import { EditorStore } from './editor.store';
import { EditorAction } from './editor.model';
import { AreaService } from '../area/area.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  constructor(
    private store: EditorStore,
    private areaService: AreaService
  ) { }

  selectArea(areaID: ID) {

  }

  setGrabbing() {
    this.setState(EditorAction.MovingPoint);
  }

  setGrab() {
    this.setState(EditorAction.GrabbingPoint);
  }

  setSelect() {
    this.setState(EditorAction.SelectingArea);
  }

  setAddingPoint() {
    this.setState(EditorAction.AddingPoint);
  }

  private setState(action: EditorAction) {
    this.store.setState(() => ({ currentAction: action }));
  }
}
