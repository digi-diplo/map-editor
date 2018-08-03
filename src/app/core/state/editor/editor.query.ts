import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Observable } from 'rxjs';

import { EditorState, CursorActions } from './editor.model';
import { EditorStore } from './editor.store';

@Injectable({
  providedIn: 'root'
})
export class EditorQuery extends Query<EditorState> {
  constructor(protected store: EditorStore) {
    super(store);
  }

  addingPoints(): Observable<boolean> {
    return this.isCursor(CursorActions.AddingPoint);
  }

  grabbing(): Observable<boolean> {
    return this.isCursor(CursorActions.Grabbing);
  }

  selecting(): Observable<boolean> {
    return this.isCursor(CursorActions.Select);
  }

  grab(): Observable<boolean> {
    return this.isCursor(CursorActions.Grab);
  }

  private isCursor(action: CursorActions): Observable<boolean> {
    return this.select(state => state.state === action);
  }
}
