import { Component, Input, Output, EventEmitter } from '@angular/core';

import { PointMoveStart } from '../region/region.component';
import { Area, CursorQuery } from '../../state';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-area]',
  template: `
    <svg:g app-region
      [active]="active"
      [points]="area.boundaries"
      [ngClass]="{'pointer': cursorIsSelect}"
      (click)="emitSelect($event)"
      (removePoint)="removePoint.emit($event)"
      (initPointMove)="initPointMove.emit($event)"/>
    <ng-template ngFor let-region [ngForOf]="area.regions">
      <svg:g app-region [points]="region.points" (removePoint)="removePoint.emit($event)" (initPointMove)="initPointMove.emit($event)"/>
    </ng-template>
  `,
  styles: [`
    .pointer {
      cursor: pointer;
    }
  `]
})
export class AreaComponent {
  @Input() area: Area;
  @Input() active = false;
  @Output() removePoint = new EventEmitter<number>();
  @Output() initPointMove = new EventEmitter<PointMoveStart>();
  @Output() select = new EventEmitter<void>();

  cursorIsSelect = false;
  constructor(
    private cursorQuery: CursorQuery
  ) {
    this.cursorQuery.selecting().subscribe(b => this.cursorIsSelect = b);
  }

  emitSelect(event: MouseEvent) {
    if (this.cursorIsSelect) {
      event.preventDefault();
      this.select.emit();
    }
  }
}
