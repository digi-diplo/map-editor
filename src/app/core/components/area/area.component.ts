import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Area, EditorQuery } from 'src/app/core/state';

import { PointMoveStart } from '../region/region.component';

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

  isEditorSelecting = false;

  constructor(
    private editorQuery: EditorQuery
  ) {
    this.editorQuery.isSelecting().subscribe(val => this.isEditorSelecting = val);
  }

  emitSelect(event: MouseEvent) {
    event.stopPropagation();
    this.select.emit();
  }
}
