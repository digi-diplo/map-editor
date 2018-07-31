import { Component, OnInit } from '@angular/core';

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
  points = '';
  viewBox: Size = { height: 250, width: 500 };

  constructor() { }

  ngOnInit() {
  }

  onClick(event: MouseEvent) {
    const { x, y } = this.getCoords(event);
    console.log(x, y);
    this.points += `${x},${y} `;
  }

  onWheel(event: Event) {
    console.log(event);
  }

  private getCoords(event: MouseEvent): Coords {
    const coords: Coords = { x: event.clientX, y: event.clientY };
    const element = event.target as HTMLElement; // TODO: do not use the event target, it does not work if you click on a polygon
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
