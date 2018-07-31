import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Area, TerrainType, AreaType } from '../models/Area';

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
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.scss']
})
export class MapEditorComponent implements OnInit {
  area: Area = {
    name: 'TestArea',
    regions: [{ points: [] }],
    terrain: TerrainType.Ground,
    type: AreaType.None
  };
  currentRegion = 0;
  viewBox: Size = { height: 250, width: 500 };

  @ViewChild('map')
  map: ElementRef<SVGElement>;

  constructor() { }

  ngOnInit() {
  }

  onClick(event: MouseEvent) {
    this.area.regions[this.currentRegion].points.push(this.getCoords(event));
  }

  addRegion() {
    this.area.regions.push({ points: [] });
    this.currentRegion++;
  }

  onWheel(event: Event) {
    console.log(event);
  }

  private getCoords(event: MouseEvent): Coords {
    const coords: Coords = { x: event.clientX, y: event.clientY };
    const element = this.map.nativeElement; // FIXME: do not use the event target, it does not work if you click on a polygon
    const rect = element.getBoundingClientRect();
    const elRelativeCoords = this.relativeToElement(coords, rect);

    return this.relativeToSvg(
      elRelativeCoords,
      rect
    );
  }

  private relativeToElement(coords: Coords, rect: ClientRect): Coords {
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
