import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule, MatSelectModule, MatIconModule, MatSnackBarModule } from '@angular/material';

import { MapEditorComponent } from './map-editor.component';
import { AreaDetailsEditorComponent } from '../area-details-editor/area-details-editor.component';
import { AreaComponent } from '../area/area.component';
import { RegionComponent } from '../region/region.component';
import { SideToolbarComponent } from '../side-toolbar/side-toolbar.component';
import { KeysPipe } from '../../pipes/keys.pipe';

describe('MapEditorComponent', () => {
  let component: MapEditorComponent;
  let fixture: ComponentFixture<MapEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapEditorComponent, AreaDetailsEditorComponent, AreaComponent, RegionComponent, SideToolbarComponent, KeysPipe ],
      imports: [MatFormFieldModule, MatSelectModule, MatIconModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
