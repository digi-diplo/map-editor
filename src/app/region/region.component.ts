import { Component, Input } from '@angular/core';

import { Coords } from '../models/Coords';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-region]',
  template: `
      <svg:polygon class="app-area" [attr.points]="svgPoints"/>
	`,
  styleUrls: ['./region.component.scss']
})
export class RegionComponent {
  @Input() points: Coords[] = [];

  get svgPoints(): string {
    return this.points
      .map(p => `${p.x},${p.y} `)
      .reduce((acc, p) => acc + p, '');
  }
}
