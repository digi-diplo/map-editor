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
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent {
  @Input() points: Coords[] = [];
  @Input() editing = true;
  @Input() active = false;

  @Output() removePoint = new EventEmitter<number>();
  @Output() initPointMove = new EventEmitter<PointMoveStart>();

  movingPoint: Observable<boolean>;
  debugMode: Observable<boolean>;

  constructor(editorQuery: EditorQuery) {
    this.movingPoint = editorQuery.isMovingPoint();
    this.debugMode = editorQuery.debuggingMode();
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
