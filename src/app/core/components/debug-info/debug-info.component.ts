import { Component, OnInit } from '@angular/core';
import { EditorQuery, EditorAction } from '../../state';

@Component({
  selector: 'app-debug-info',
  template: `
	  <span>Editor state: {{editorState}}</span>
	`,
  styleUrls: ['./debug-info.component.scss']
})
export class DebugInfoComponent implements OnInit {
  editorState: EditorAction;

  constructor(
    private editorQuery: EditorQuery
  ) {
    this.editorQuery.select(s => s.currentAction).subscribe(s => this.editorState = s);
  }

  ngOnInit() {
  }

}
