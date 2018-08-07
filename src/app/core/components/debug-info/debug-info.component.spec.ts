import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggleModule } from '@angular/material';

import { DebugInfoComponent } from './debug-info.component';

describe('DebugInfoComponent', () => {
  let component: DebugInfoComponent;
  let fixture: ComponentFixture<DebugInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebugInfoComponent ],
      imports: [MatSlideToggleModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebugInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
