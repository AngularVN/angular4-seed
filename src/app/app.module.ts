import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';



import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';


import { AboutComponent } from './about/component';
// import { PageError404Component } from './pages/common/error/error404';




// UI
import { ButtonsComponent } from './ui/buttons';
import { IconsComponent } from './ui/icons';
import { GridsComponent } from './ui/grids';
import { TypographyComponent } from './ui/typography';
import { ComponentsComponent } from './ui/components';
// // TABLES
// import { StaticTableComponent } from './pages/tables/static';
// import { DynamicTableComponent } from './pages/tables/dynamic';
// import { ResponsiveTableComponent } from './pages/tables/responsive';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule,
    routing,

    SharedModule,
    LayoutModule
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    // PageError404Component,

    // UI
    GridsComponent,
    ComponentsComponent,
    IconsComponent,
    ButtonsComponent,
    TypographyComponent,
    // // TABLES
    // StaticTableComponent,
    // DynamicTableComponent,
    // ResponsiveTableComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}