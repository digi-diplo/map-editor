import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ID } from '@datorama/akita';

import { Observable } from 'rxjs';

import { Area, AreasQuery, AreaService, EditorService, EditorAction } from 'src/app/core/state';
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

  // TODO: refactor to editor state
  movingPoint = false;
  movingConfirmed = false;
  pointMoveStartEvent: PointMoveStart;

  constructor(
    private areaQuery: AreasQuery,
    private areaService: AreaService,
    private editorService: EditorService
  ) { }

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
    this.editorService.setAddingPoint();
  }

  movePoint(event: MouseEvent) {
    if (!this.movingPoint) { return; }
    const newPos = this.getCoordsRelativeToMap({ x: event.clientX, y: event.clientY });

    if (!this.movingConfirmed) {
      const startPos = this.getCoordsRelativeToMap(this.pointMoveStartEvent.pos);
      const distance = Math.abs(distanceBetween(newPos, startPos));
      if (distance > 2) {
        this.movingConfirmed = true;
        this.editorService.setGrabbing();
      }
    } else {
      this.areaService.movePointFromActiveRegion(this.pointMoveStartEvent.pointIndex, newPos);
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.editorService.setSelect();
      this.areaService.resetActive();
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
