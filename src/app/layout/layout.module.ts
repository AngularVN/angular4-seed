import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/component';
import { FooterComponent } from './footer/component';
import { SidebarComponent } from './sidebar/component';
import { SettingService } from './../services/setting';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [
    SidebarComponent,
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    HeaderComponent
  ],
  providers: [
    SettingService
  ]
})
export class LayoutModule {}
