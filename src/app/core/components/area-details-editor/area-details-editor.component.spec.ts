import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaDetailsEditorComponent } from './area-details-editor.component';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '../../../../../node_modules/@angular/material';
import { KeysPipe } from '../../pipes/keys.pipe';
import { BrowserAnimationsModule } from '../../../../../node_modules/@angular/platform-browser/animations';

describe('AreaDetailsEditorComponent', () => {
  let component: AreaDetailsEditorComponent;
  let fixture: ComponentFixture<AreaDetailsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaDetailsEditorComponent, KeysPipe ],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
      ]
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
