import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MapEditorComponent } from './map-editor/map-editor.component';

const matModules = [
  MatToolbarModule,
];

@NgModule({
  declarations: [
    AppComponent,
    MapEditorComponent
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
