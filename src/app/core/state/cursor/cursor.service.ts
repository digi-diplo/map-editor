import { Injectable } from '@angular/core';

import { CursorStore } from './cursor.store';
import { CursorActions } from './cursor.model';

@Injectable({
  providedIn: 'root'
})
export class CursorService {
  constructor(
    private store: CursorStore
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
