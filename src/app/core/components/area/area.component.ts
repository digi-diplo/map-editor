import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PointMoveStart } from '../region/region.component';

import { Area } from '../../state';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-area]',
  template: `
      <ng-template ngFor let-region [ngForOf]="area.regions">
        <svg:g app-region [points]="region.points" (removePoint)="removePoint.emit($event)" (initPointMove)="initPointMove.emit($event)"/>
      </ng-template>
  `,
  styles: [`

  `]
})
export class AreaComponent {
  @Input() area: Area;
  @Output() removePoint = new EventEmitter<number>();
  @Output() initPointMove = new EventEmitter<PointMoveStart>();
}
