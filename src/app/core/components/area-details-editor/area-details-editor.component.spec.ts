import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AreaDetailsEditorComponent } from './area-details-editor.component';
import { KeysPipe } from '../../pipes/keys.pipe';

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
        MatSelectModule,
        MatIconModule
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
