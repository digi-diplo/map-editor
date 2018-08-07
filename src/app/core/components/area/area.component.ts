import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Area, EditorQuery } from 'src/app/core/state';

import { PointMoveStart } from '../region/region.component';
import { Coords } from '../../../models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-area]',
  template: `
    <svg:g app-region
      [active]="active"
      [points]="area.boundaries"
      [ngClass]="{'pointer': isEditorSelecting}"
      (click)="emitSelect($event)"
      (removePoint)="removePoint.emit($event)"
      (initPointMove)="initPointMove.emit($event)"/>
    <svg:text class="debug-text" *ngIf="area.boundaries.length" [attr.x]="mean.x" [attr.y]="mean.y">{{area.id}}</svg:text>
    <ng-template ngFor let-region [ngForOf]="area.regions">
      <svg:g app-region [points]="region.points" (removePoint)="removePoint.emit($event)" (initPointMove)="initPointMove.emit($event)"/>
    </ng-template>
  `,
  styles: [`
    .pointer {
      cursor: pointer;
    }
    .debug-text {
      font-size: 8px;
      pointer-events: none;
    }
  `]
})
export class AreaComponent {
  @Input() area: Area;
  @Input() active = false;

  @Output() removePoint = new EventEmitter<number>();
  @Output() initPointMove = new EventEmitter<PointMoveStart>();
  @Output() select = new EventEmitter<void>();

  isEditorSelecting = false;

  get mean(): Coords {
    const coords = this.area.boundaries.reduce((acc, cur) => ({ x: acc.x + cur.x, y: acc.y + cur.y }));
    const length = this.area.boundaries.length;
    return {
      x: coords.x / length - 40, // approximately the half of the width of the text
      y: coords.y / length + 2.5
    };
  }

  constructor(
    private editorQuery: EditorQuery
  ) {
    this.editorQuery.isSelecting().subscribe(val => this.isEditorSelecting = val);
  }

  emitSelect(event: MouseEvent) {
    // FIXME: How can we extract this logic from here ?
    if (this.isEditorSelecting) {
      event.stopPropagation();
      this.select.emit();
    }
  }
}
