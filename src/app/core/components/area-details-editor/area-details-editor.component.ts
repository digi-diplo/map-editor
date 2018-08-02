import { Component, Input } from '@angular/core';
import { Area, TerrainType, AreaType } from '../../state';


@Component({
  selector: 'app-area-details-editor',
  templateUrl: './area-details-editor.component.html',
  styleUrls: ['./area-details-editor.component.scss']
})
export class AreaDetailsEditorComponent {
  terrainTypes = TerrainType;
  areaTypes = AreaType;
  @Input() area: Area;
}
