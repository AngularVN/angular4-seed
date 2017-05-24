import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SettingService } from './../../services/setting';

@Component({
  selector: 'app-sidebar',
  providers: [SettingService],
  templateUrl: './app/layout/sidebar/template.html'
})

export class SidebarComponent implements OnInit {
  public collapses: Array < boolean > ;
  private navMenus: any;
  constructor(public setting: SettingService) {}

  public menuItems: IMenu[] = [];

  ngOnInit() {
    let navMenus: any = [{
      text: 'Dashboard',
      link: '/dashboard',
      icon: 'icon-speedometer',
    }, {
      text: 'Widgets',
      link: '/widgets',
      icon: 'icon-grid'
    }, {
      text: 'Elements',
      link: '/ui',
      icon: 'icon-chemistry',
      submenu: [{
        text: 'Buttons',
        link: '/ui/buttons'
      }, {
        text: 'Components',
        link: '/ui/components'
      }, {
        text: 'Typography',
        link: '/ui/typography'
      }, {
        text: 'Icons',
        link: '/ui/icons'
      }, {
        text: 'Grid',
        link: '/ui/grids'
      }]
    }, {
      text: 'Forms',
      link: '/forms',
      icon: 'icon-note',
      submenu: [{
        text: 'Standard',
        link: '/forms/standard'
      }, {
        text: 'Extended',
        link: '/forms/extended'
      }, {
        text: 'Validation',
        link: '/forms/validation'
      }, {
        text: 'Upload',
        link: '/forms/upload'
      }, {
        text: 'Image Crop',
        link: '/forms/cropper'
      }]
    }, {
      text: 'Charts',
      link: '/charts',
      icon: 'icon-graph',
      submenu: [{
        text: 'Flot',
        link: '/charts/flot'
      }, {
        text: 'Radial',
        link: '/charts/radial'
      }, {
        text: 'ChartJS',
        link: '/charts/chartjs'
      }]
    }, {
      text: 'Tables',
      link: '/tables',
      icon: 'icon-grid',
      submenu: [{
        text: 'Standard',
        link: '/tables/standard'
      }, {
        text: 'Extended',
        link: '/tables/extended'
      }, {
        text: 'Data-Tables',
        link: '/tables/datatable'
      }, {
        text: 'Angular Grid',
        link: '/tables/aggrid'
      }]
    }, {
      text: 'Maps',
      link: '/maps',
      icon: 'icon-map',
      submenu: [{
        text: 'Google',
        link: '/maps/google'
      }, {
        text: 'Vector',
        link: '/maps/vector'
      }]
    }, {
      text: 'Pages',
      link: '/pages',
      icon: 'icon-doc',
      submenu: [{
        text: 'Login',
        link: '/login'
      }, {
        text: 'Register',
        link: '/register'
      }, {
        text: 'Recover',
        link: '/recover'
      }, {
        text: 'Lock',
        link: '/lock'
      }, {
        text: '404',
        link: '/404'
      }, {
        text: '500',
        link: '/500'
      }, {
        text: 'Maintenance',
        link: '/maintenance'
      }]
    }];
    this.menuItems = this.addMenu(navMenus);
  }

  private addMenu(navMenus: any) {
    let items: IMenu[] = [];
    navMenus.forEach((item) => {
      items.push(item);
    });
    this.collapses = Array(items.length).fill(true);
    return items;
  }

  public collapsed(event: any): void {
    // console.log(event);
  }
}

export interface IMenu {
  text: string;
  heading ? : boolean;
  link ? : string;
  icon ? : string;
  alert ? : string;
  submenu ? : Array < any > ;
}
