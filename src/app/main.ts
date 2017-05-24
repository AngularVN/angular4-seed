import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import { AppSettings } from './appsettings';

if ('Dev' !== AppSettings.Environment) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
