import { APP_BASE_HREF } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { TRANSLATION_PROVIDERS } from './translate/translations';
// import { TranslateService } from './translate/service';
import { AboutComponent } from './about/component';
// import { PageError404Component } from './pages/common/error/error404';

// UI
import { ButtonsComponent } from './ui/buttons';
import { IconsComponent } from './ui/icons';
import { GridsComponent } from './ui/grids';
import { TypographyComponent } from './ui/typography';
import { ComponentsComponent } from './ui/components';

// TABLES
// import { StaticTableComponent } from './pages/tables/static';
// import { DynamicTableComponent } from './pages/tables/dynamic';
// import { ResponsiveTableComponent } from './pages/tables/responsive';


const appRoutes: Routes = [
  // { path: 'tables/static', component: StaticTableComponent },
  // { path: 'tables/dynamic', component: DynamicTableComponent },
  // { path: 'tables/responsive', component: ResponsiveTableComponent },
  { path: 'ui/grids', component: GridsComponent },
  { path: 'ui/components', component: ComponentsComponent },
  { path: 'ui/icons', component: IconsComponent },
  { path: 'ui/buttons', component: ButtonsComponent },
  { path: 'ui/typography', component: TypographyComponent },
  { path: 'about', component: AboutComponent },
  { path: '', component: AboutComponent },
  { path: '**', component: AboutComponent }
];
export const appRoutingProviders: any[] = [{
    provide: APP_BASE_HREF,
    useValue: '/'
  },
  // TRANSLATION_PROVIDERS,
  // TranslateService
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
