import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';

import { EditorState, EditorAction } from './editor.model';

const initialState: EditorState = {
  currentAction: EditorAction.SelectingArea
};

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'editor'
})
export class EditorStore extends Store<EditorState> {
  constructor() {
    super(initialState);
  }
}
