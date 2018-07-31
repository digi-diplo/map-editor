import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MapEditorComponent } from './map-editor/map-editor.component';
import { AreaComponent } from './area/area.component';
import { RegionComponent } from './region/region.component';

const matModules = [
  MatToolbarModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    AppComponent,
    MapEditorComponent,
    AreaComponent,
    RegionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ...matModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
