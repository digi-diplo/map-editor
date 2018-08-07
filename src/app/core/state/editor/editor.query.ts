import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Observable } from 'rxjs';

import { EditorState, EditorAction } from './editor.model';
import { EditorStore } from './editor.store';

@Injectable({
  providedIn: 'root'
})
export class EditorQuery extends Query<EditorState> {
  constructor(protected store: EditorStore) {
    super(store);
  }

  debuggingMode(): Observable<boolean> {
    return this.select(state => state.debugMode);
  }

  isAddingPoint(): Observable<boolean> {
    return this.isAction(EditorAction.AddingPoint);
  }

  isGrabbing(): Observable<boolean> {
    return this.isAction(EditorAction.GrabbingPoint);
  }

  isSelecting(): Observable<boolean> {
    return this.isAction(EditorAction.SelectingArea);
  }

  isMovingPoint(): Observable<boolean> {
    return this.isAction(EditorAction.MovingPoint);
  }

  private isAction(action: EditorAction): Observable<boolean> {
    return this.select(state => state.currentAction === action);
  }
}
