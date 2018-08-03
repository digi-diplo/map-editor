import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatButtonModule, MatSnackBarModule } from '@angular/material';

import { SideToolbarComponent } from './side-toolbar.component';

describe('SideToolbarComponent', () => {
  let component: SideToolbarComponent;
  let fixture: ComponentFixture<SideToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideToolbarComponent ],
      imports: [MatIconModule, MatButtonModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
