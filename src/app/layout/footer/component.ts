import { Component } from '@angular/core';

import { SettingService } from './../../services/setting';


@Component({
  selector: 'app-footer',
  providers: [SettingService],
  templateUrl: './app/layout/footer/template.html'
})

export class FooterComponent {
  constructor(public setting: SettingService) {}
}
