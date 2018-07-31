import { Component, Input } from '@angular/core';

import { Coords } from '../models/Coords';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-region]',
  template: `
      <svg:polygon class="app-area" [attr.points]="svgPoints"/>
      <ng-template *ngIf="editing" ngFor let-i="index" let-point [ngForOf]="points">
        <svg:circle (contextmenu)="deletePoint($event, i)" class="app-drag-circle" [attr.cx]="point.x" [attr.cy]="point.y" r="2" fill="red"/>
      </ng-template>
	`,
  styleUrls: ['./region.component.scss']
})
export class RegionComponent {
  @Input() points: Coords[] = [];
  @Input() editing = true;

  get svgPoints(): string {
    return this.points
      .map(p => `${p.x},${p.y} `)
      .reduce((acc, p) => acc + p, '');
  }

  deletePoint(event: MouseEvent, index: number) {
    event.preventDefault();
    this.points = [
      ...this.points.filter((p, i) => i !== index)
    ];
  }
}
