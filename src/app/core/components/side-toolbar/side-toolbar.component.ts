import { Component, OnDestroy } from '@angular/core';
import { AreasService } from '../../state';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-toolbar',
  templateUrl: './side-toolbar.component.html',
  styleUrls: ['./side-toolbar.component.scss']
})
export class SideToolbarComponent implements OnDestroy {
  subscribtions: Subscription[] = [];
  constructor(
    private areaService: AreasService,
    private snackBar: MatSnackBar
  ) { }

  addArea() {
    // Set cursor
    // Second click create new area
    this.areaService.addDumyArea();
  }

  resetState() {
    const dialogRef = this.snackBar.open('Do you really want to reset everything ?',
      'CONFIRM',
      { duration: 3500, verticalPosition: 'top' }
    );
    const sub = dialogRef.onAction().subscribe(() => this.areaService.resetState());
    this.subscribtions.push(sub);
  }

  ngOnDestroy() {
    this.subscribtions.forEach(s => s.unsubscribe());
  }
}
