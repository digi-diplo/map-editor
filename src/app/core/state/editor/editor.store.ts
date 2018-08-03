import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';

import { EditorState, CursorActions } from './editor.model';

const initialState: EditorState = {
  state: CursorActions.Select
};

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'cursor'
})
export class EditorStore extends Store<EditorState> {
  constructor() {
    super(initialState);
  }
}
