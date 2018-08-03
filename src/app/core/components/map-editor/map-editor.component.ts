import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Observable } from 'rxjs';

import { PointMoveStart } from '../region/region.component';
import { Area, AreasQuery, AreasService, CursorService } from '../../state';
import { distanceBetween } from '../../../models';

interface Coords {
  x: number;
  y: number;
}

interface Size {
  height: number;
  width: number;
}

@Component({
  selector: 'app-map-editor',
  template: `
    <app-area-details-editor class="entity-toolbar" *ngIf="activeArea$ | async" [area]="activeArea$ | async"></app-area-details-editor>
    <app-side-toolbar class="sidebar"></app-side-toolbar>
    <div class="app-map-container">
      <svg #map [ngClass]="{'crosshair': activeArea$ | async}"
        (click)="onClick($event)"
        (mousemove)="movePoint($event)"
        (mouseup)="pointMoveEnd($event)"
        (wheel)="onWheel($event)"
        viewBox="0 0 500 250">
        <ng-template ngFor let-area [ngForOf]="areas$ | async">
          <svg:g app-area
            [active]="area === (activeArea$ | async)"
            [area]="area"
            (removePoint)="removePoint($event)"
            (initPointMove)="pointMoveStart($event)"/>
        </ng-template>
      </svg>
    </div>
		`,
  styleUrls: ['./map-editor.component.scss']
})
export class MapEditorComponent {
  areas$: Observable<Area[]> = this.areaQuery.selectAll();
  activeArea$: Observable<Area> = this.areaQuery.selectActive();

  viewBox: Size = { height: 250, width: 500 };
  @ViewChild('map')
  map: ElementRef<SVGElement>;

  movingPoint = false;
  movingConfirmed = false;
  pointMoveStartEvent: PointMoveStart;

  constructor(
    private areaQuery: AreasQuery,
    private areaService: AreasService,
    private cursorService: CursorService
  ) { }

  onClick(event: MouseEvent) {
    this.areaService.addPointToActiveArea(
      this.getCoordsRelativeToMap({ x: event.clientX, y: event.clientY })
    );
  }

  clearState() {
    this.areaService.resetState();
  }

  removePoint(index: number) {
    this.areaService.removePointToActiveRegion(index);
  }

  pointMoveStart(event: PointMoveStart) {
    this.pointMoveStartEvent = event;
    this.movingPoint = true;
    this.movingConfirmed = false;
  }

  movePoint(event: MouseEvent) {
    if (!this.movingPoint) { return; }
    const newPos = this.getCoordsRelativeToMap({ x: event.clientX, y: event.clientY });

    if (!this.movingConfirmed) {
      const startPos = this.getCoordsRelativeToMap(this.pointMoveStartEvent.pos);
      const distance = Math.abs(distanceBetween(newPos, startPos));
      if (distance > 2) {
        this.movingConfirmed = true;
        this.cursorService.setGrabbing();
      }
    } else {
      this.areaService.movePointFromActiveRegion(this.pointMoveStartEvent.pointIndex, newPos);
    }
  }

  pointMoveEnd(event: MouseEvent) {
    if (!this.movingPoint) { return; }

    this.movePoint(event);
    this.movingPoint = false;
    this.movingConfirmed = false;
    this.pointMoveStartEvent = null;
    this.cursorService.setAddingPoint();
  }

  addArea() {
    this.areaService.addDumyArea();
  }

  onWheel(event: Event) {
    console.log(event);
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
