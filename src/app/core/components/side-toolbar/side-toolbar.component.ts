import { Component, OnInit } from '@angular/core';
import { AreasService } from '../../state';

@Component({
  selector: 'app-side-toolbar',
  templateUrl: './side-toolbar.component.html',
  styleUrls: ['./side-toolbar.component.scss']
})
export class SideToolbarComponent {

  constructor(
    private areaService: AreasService
  ) { }

  addArea() {
    // Set cursor
    // Second click create new area
    this.areaService.addDumyArea();
  }
}
