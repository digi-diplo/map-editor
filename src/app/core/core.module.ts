import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';

import { AreaDetailsEditorComponent } from './components/area-details-editor/area-details-editor.component';
import { SideToolbarComponent } from './components/side-toolbar/side-toolbar.component';
import { DebugInfoComponent } from './components/debug-info/debug-info.component';
import { MapEditorComponent } from './components/map-editor/map-editor.component';
import { RegionComponent } from './components/region/region.component';
import { AreaComponent } from './components/area/area.component';

import { KeysPipe } from './pipes/keys.pipe';

const matModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule
];

@NgModule({
  imports: [
    CommonModule,
    ...matModules
  ],
  declarations: [
    AreaDetailsEditorComponent,
    SideToolbarComponent,
    MapEditorComponent,
    DebugInfoComponent,
    RegionComponent,
    AreaComponent,

    KeysPipe,
  ],
  exports: [
    AreaDetailsEditorComponent,
    SideToolbarComponent,
    MapEditorComponent,
    RegionComponent,
    AreaComponent,
  ]
})
export class CoreModule { }
