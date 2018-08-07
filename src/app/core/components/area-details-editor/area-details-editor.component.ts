import { Component, Input } from '@angular/core';

import { Area, TerrainType, AreaType, EditorService } from 'src/app/core/state';

@Component({
  selector: 'app-area-details-editor',
  templateUrl: './area-details-editor.component.html',
  styleUrls: ['./area-details-editor.component.scss']
})
export class AreaDetailsEditorComponent {
  terrainTypes = TerrainType;
  areaTypes = AreaType;
  @Input() area: Area;

  constructor(
    private editorService: EditorService
  ) {

  }

  deleteArea() {
    this.editorService.deleteActiveArea();
  }

  selectAddPointsTool() {
    this.editorService.usePointAddTool();
  }
}
