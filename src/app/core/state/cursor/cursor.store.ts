import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';

import { CursorState, CursorActions } from './cursor.model';

const initialState: CursorState = {
  state: CursorActions.Select
};

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'cursor'
})
export class CursorStore extends Store<CursorState> {
  constructor() {
    super(initialState);
  }
}
