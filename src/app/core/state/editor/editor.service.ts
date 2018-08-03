import { Injectable } from '@angular/core';

import { EditorStore } from './editor.store';
import { CursorActions } from './editor.model';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  constructor(
    private store: EditorStore
  ) { }

  setGrabbing() {
    this.setState(CursorActions.Grabbing);
  }

  setGrab() {
    this.setState(CursorActions.Grab);
  }

  setSelect() {
    this.setState(CursorActions.Select);
  }

  setAddingPoint() {
    this.setState(CursorActions.AddingPoint);
  }

  private setState(action: CursorActions) {
    this.store.setState(() => ({ state: action }));
  }
}
