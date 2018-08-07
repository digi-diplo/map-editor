import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Subscription } from 'rxjs';

import { AreaService, EditorService } from 'src/app/core/state';

@Component({
  selector: 'app-side-toolbar',
  templateUrl: './side-toolbar.component.html',
  styleUrls: ['./side-toolbar.component.scss']
})
export class SideToolbarComponent implements OnDestroy {
  subscribtions: Subscription[] = [];
  constructor(
    private areaService: AreaService,
    private editorService: EditorService,
    private snackBar: MatSnackBar
  ) { }

  addArea() {
    this.editorService.createNewArea();
  }

  resetState() {
    const dialogRef = this.snackBar.open('Do you really want to reset everything ?',
      'CONFIRM',
      { duration: 3500, verticalPosition: 'top' }
    );
    const sub = dialogRef.onAction().subscribe(() => this.editorService.clearMap());
    this.subscribtions.push(sub);
  }

  ngOnDestroy() {
    this.subscribtions.forEach(s => s.unsubscribe());
  }
}
