import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { persistState, enableAkitaProdMode } from '@datorama/akita';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'hammerjs'; // Gesture support for @angular/material

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

persistState();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
