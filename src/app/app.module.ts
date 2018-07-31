import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MapEditorComponent } from './map-editor/map-editor.component';
import { AreaComponent } from './area/area.component';
import { RegionComponent } from './region/region.component';
import { HttpClientModule } from '@angular/common/http';
import { AreaDetailsEditorComponent } from './area-details-editor/area-details-editor.component';

const matModules = [
  MatToolbarModule,
  MatButtonModule
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...matModules
  ],
  declarations: [
    AppComponent,
    MapEditorComponent,
    AreaComponent,
    RegionComponent,
    AreaDetailsEditorComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
