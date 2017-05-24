import { Injectable } from '@angular/core';

@Injectable()
export class SettingService {

  private user: any;
  private app: any;
  public layout: any;

  constructor() {

    // User Settings
    this.user = {
      name: 'John',
      picture: ''
    };

    // App Settings
    this.app = {
      name: 'DDS',
      description: 'Angular 4 Seed',
      year: ((new Date()).getFullYear())
    };

    // Layout Settings
    this.layout = {
      isFixed: true,
      isCollapsed: false,
      isBoxed: false,
      isRTL: false,
      horizontal: false,
      isFloat: false,
      asideHover: false,
      theme: null,
      asideScrollbar: false,
      isCollapsedText: false,
      useFullLayout: false,
      hiddenFooter: false,
      offsidebarOpen: false,
      asideToggled: false,
      viewAnimation: 'ng-fadeInUp'
    };

  }

  getAppSetting(name:string) {
    return name ? this.app[name] : this.app;
  }
  setAppSetting(name:string, value:string) {
    if (typeof this.app[name] !== 'undefined') {
      this.app[name] = value;
    }
  }

  getUserSetting(name:string) {
    return name ? this.user[name] : this.user;
  }
  setUserSetting(name:string, value:string) {
    if (typeof this.user[name] !== 'undefined') {
      this.user[name] = value;
    }
  }

  getLayoutSetting(name:string) {
    return name ? this.layout[name] : this.layout;
  }

  setLayoutSetting(name:string, value:any) {
    if (typeof this.layout[name] !== 'undefined') {
      return this.layout[name] = value;
    }
  }

  toggleLayoutSetting(name:string) {
    return this.setLayoutSetting(name, !this.getLayoutSetting(name));
  }

}
