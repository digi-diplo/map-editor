import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Observable } from 'rxjs';

import { CursorState, CursorActions } from './cursor.model';
import { CursorStore } from './cursor.store';

@Injectable({
  providedIn: 'root'
})
export class CursorQuery extends Query<CursorState> {
  constructor(protected store: CursorStore) {
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
