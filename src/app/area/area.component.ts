import { Component, OnInit, Input } from '@angular/core';
import { Area } from '../models/Area';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-area]',
  template: `
      <ng-template ngFor let-region [ngForOf]="area.regions">
        <svg:g app-region [points]="region.points"/>
      </ng-template>
  `,
  styles: [`

  `]
})
export class AreaComponent implements OnInit {
  @Input() area: Area;

  constructor() { }

  ngOnInit() {
  }

}
