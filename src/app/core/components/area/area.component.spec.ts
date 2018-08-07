import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaComponent } from './area.component';
import { RegionComponent } from '../region/region.component';
import { TerrainType, AreaType } from '../../state';
import { MatSlideToggleModule } from '../../../../../node_modules/@angular/material';

describe('AreaComponent', () => {
  let component: AreaComponent;
  let fixture: ComponentFixture<AreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AreaComponent, RegionComponent],
      imports: [MatSlideToggleModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaComponent);
    component = fixture.componentInstance;
    component.area = { name: 'Test area', terrain: TerrainType.Ground, type: AreaType.Arsenal, boundaries: [], id: 1, regions: [] };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
