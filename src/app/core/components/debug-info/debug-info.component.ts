import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';

import { EditorQuery, EditorAction, EditorService } from '../../state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-debug-info',
  template: `
  <span>Editor state: {{editorState}}</span>
  <mat-slide-toggle #toggle
      class="last"
      labelPosition="before"
      disableRipple="true"
      (change)="toggleDebug($event)"
      [checked]="debuggingActivated | async">
    Debug mode {{toggle.checked ? 'On': 'Off'}}
  </mat-slide-toggle>
	`,
  styleUrls: ['./debug-info.component.scss']
})
export class DebugInfoComponent implements OnInit {
  editorState: EditorAction;
  debuggingActivated: Observable<boolean>;

  constructor(
    private editorQuery: EditorQuery,
    private editorService: EditorService
  ) {
    this.editorQuery.select(s => s.currentAction).subscribe(s => this.editorState = s);
    this.debuggingActivated = this.editorQuery.debuggingMode();
  }

  toggleDebug(event: MatSlideToggleChange) {
    this.editorService.setDebugState(event.checked);
  }

  ngOnInit() {
  }

}
