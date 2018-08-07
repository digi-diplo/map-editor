import { NgModule, Sanitizer, SecurityContext } from '@angular/core';
import { BrowserModule, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatIconRegistry } from '@angular/material';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(registry: MatIconRegistry, sanitizer: DomSanitizer) {
    registry.addSvgIcon('github_mark', sanitizer.bypassSecurityTrustResourceUrl('../assets/github-mark.svg'));
  }
}
