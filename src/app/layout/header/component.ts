import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { SettingService } from './../../services/setting';

@Component({
  selector: 'app-header',
  providers: [SettingService],
  templateUrl: './app/layout/header/template.html'
})

export class HeaderComponent {
  constructor(@Inject(DOCUMENT) private document, public setting: SettingService) {}

  public changeTheme(theme) {
    this.document.getElementById('theme').setAttribute('href', ['css/', theme, '.css'].join(''));
  }
}
