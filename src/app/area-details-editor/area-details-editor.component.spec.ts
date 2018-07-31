import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaDetailsEditorComponent } from './area-details-editor.component';

describe('AreaDetailsEditorComponent', () => {
  let component: AreaDetailsEditorComponent;
  let fixture: ComponentFixture<AreaDetailsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaDetailsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaDetailsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
