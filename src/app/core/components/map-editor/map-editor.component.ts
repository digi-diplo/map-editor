import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ID } from '@datorama/akita';

import { Observable } from 'rxjs';

import { Area, AreaQuery, AreaService, EditorService, EditorAction, EditorQuery } from 'src/app/core/state';
import { distanceBetween, Coords } from 'src/app/models';

import { PointMoveStart } from '../region/region.component';

interface Size {
  height: number;
  width: number;
}

@Component({
  selector: 'app-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.scss']
})
export class MapEditorComponent {
  areas$: Observable<Area[]> = this.areaQuery.selectAll();
  activeArea$: Observable<Area> = this.areaQuery.selectActive();

  viewBox: Size = { height: 250, width: 500 };

  @ViewChild('map')
  map: ElementRef<SVGElement>;

  isAddingPoint = false;

  // TODO: refactor to editor state
  movingPoint = false;
  movingConfirmed = false;
  pointMoveStartEvent: PointMoveStart;

  constructor(
    private areaQuery: AreaQuery,
    private areaService: AreaService,
    private editorService: EditorService,
    private editorQuery: EditorQuery
  ) {
    this.editorQuery.isAddingPoint().subscribe(v => this.isAddingPoint = v);
  }

  addPoint(event: MouseEvent) {
    this.editorService.addPoint(
      this.getCoordsRelativeToMap({ x: event.clientX, y: event.clientY })
    );
  }

  selectArea(areaID: ID) {
    this.editorService.selectArea(areaID);
  }

  removePoint(index: number) {
    this.areaService.removePointToActiveRegion(index);
  }

  pointMoveStart(event: PointMoveStart) {
    this.pointMoveStartEvent = event;
    this.movingPoint = true;
    this.movingConfirmed = false;
  }

  pointMoveEnd(event: MouseEvent) {
    if (!this.movingPoint) { return; }

    this.movePoint(event);
    this.movingPoint = false;
    this.movingConfirmed = false;
    this.pointMoveStartEvent = null;
    this.editorService.usePointAddTool();
  }

  movePoint(event: MouseEvent) {
    if (!this.movingPoint) { return; }
    const newPos = this.getCoordsRelativeToMap({ x: event.clientX, y: event.clientY });

    if (!this.movingConfirmed) {
      const startPos = this.getCoordsRelativeToMap(this.pointMoveStartEvent.pos);
      const distance = Math.abs(distanceBetween(newPos, startPos));
      if (distance > 2) {
        this.movingConfirmed = true;
        this.editorService.useMovingTool();
      }
    } else {
      this.areaService.movePointFromActiveRegion(this.pointMoveStartEvent.pointIndex, newPos);
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // TODO: move elsewherea
    if (event.key === 'Escape') {
      this.editorService.useSelectTool();
      this.areaService.resetActive();
    } else if (event.key === 'Delete') {
      this.editorService.deleteActiveArea();
    } else if (event.key === 'a') {
      this.editorService.usePointAddTool();
    } else if (event.metaKey || event.ctrlKey) {
      if (event.key === 'z') {
        this.editorService.undo();
      } else if (event.key === 'y') {
        this.editorService.redo();
      }
    }
  }

  private getCoordsRelativeToMap(coords: Coords): Coords {
    const element = this.map.nativeElement;
    const rect = element.getBoundingClientRect();
    const elRelativeCoords = this.relativeToRect(coords, rect);

    return this.relativeToSvg(
      elRelativeCoords,
      rect
    );
  }

  private relativeToRect(coords: Coords, rect: ClientRect): Coords {
    return {
      x: coords.x - rect.left,
      y: coords.y - rect.top
    };
  }

  private relativeToSvg(coords: Coords, rect: ClientRect): Coords {
    return {
      x: coords.x / rect.width * this.viewBox.width,
      y: coords.y / rect.height * this.viewBox.height
    };
  }
}
