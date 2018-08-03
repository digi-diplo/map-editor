import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { Coords } from 'src/app/models';
import { EditorQuery } from 'src/app/core/state';

export interface PointMoveStart {
  pointIndex: number;
  pos: Coords;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-region]',
  template: `
      <svg:polygon class="app-area" [ngClass]="{'active': active}" [attr.points]="svgPoints"/>
      <ng-template *ngIf="editing" ngFor let-i="index" let-point [ngForOf]="points">
        <svg:circle *ngIf="active"
          [ngClass]="{'grabbing': (cursorGrabbing | async)}"
          (mousedown)="initMove($event, i)"
          (contextmenu)="deletePoint($event, i)"
          class="app-drag-circle"
          [attr.cx]="point.x"
          [attr.cy]="point.y"
          r="2"
          fill="red"/>
      </ng-template>
	`,
  styleUrls: ['./region.component.scss']
})
export class RegionComponent {
  @Input() points: Coords[] = [];
  @Input() editing = true;
  @Input() active = false;

  @Output() removePoint = new EventEmitter<number>();
  @Output() initPointMove = new EventEmitter<PointMoveStart>();

  cursorGrabbing: Observable<boolean>;

  constructor(editorQuery: EditorQuery) {
    this.cursorGrabbing = editorQuery.isGrabbing();
  }

  get svgPoints(): string {
    return this.points
      .map(p => `${p.x},${p.y} `)
      .reduce((acc, p) => acc + p, '');
  }

  deletePoint(event: MouseEvent, index: number) {
    event.preventDefault();
    this.removePoint.emit(index);
  }

  initMove(event: MouseEvent, index: number) {
    console.log('init move');
    this.initPointMove.emit({
      pos: { x: event.clientX, y: event.clientY },
      pointIndex: index
    });
    event.preventDefault();
  }
}
