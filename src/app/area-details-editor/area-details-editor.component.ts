import { Component, OnInit, Input } from '@angular/core';
import { Area } from '../state';

@Component({
  selector: 'app-area-details-editor',
  template: `
			<mat-toolbar>Name: {{area.name}} TerrainType: {{area.terrain}} Contains: {{area.type}}</mat-toolbar>
		`,
  styleUrls: ['./area-details-editor.component.scss']
})
export class AreaDetailsEditorComponent implements OnInit {
  @Input() area: Area;

  constructor() { }

  ngOnInit() {
  }

}
