import { Component, ChangeDetectionStrategy, } from '@angular/core';

@Component({
  selector: 'app-components',
  templateUrl: './app/ui/components.html',
  changeDetection: ChangeDetectionStrategy.OnPush // require by tooltip
})

export class ComponentsComponent {

  // pager
  public page: number = 1;
  public limit: number = 5;
  public perPage: any[] = [5, 10, 20, 50, 100];
  public fromItem: number;
  public toItem: number;
  public totalItems: number = 100;
  public items = [];

  constructor() {
    for (var i = 0; i < 100; i++) {
      this.items.push('This is item #' + i);
    }
    this.fromItem = ((this.page - 1) * this.limit) + 1;
    this.toItem = (this.totalItems < (this.page * this.limit)) ? this.totalItems : (this.page * this.limit);


    // processbar
    this.random();
    this.randomStacked();
  }
  public setPage(page: number) {
    this.page = page;
  }

  public pageChanged(event: any) {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.perPage);
    this.page = event.page;
    this.fromItem = ((this.page - 1) * this.limit) + 1;
    this.toItem = (this.totalItems < (this.page * this.limit)) ? this.totalItems : (this.page * this.limit);
  }

  public perPageChanged(limit: any) {
    let page = 1;
    this.page = page;
    this.limit = limit;
    this.fromItem = ((page - 1) * limit) + 1;
    this.toItem = (this.totalItems < (page * limit)) ? this.totalItems : (page * limit);
  }


  // tab
  tabs: any = [{
    title: "Dynamic Title 1",
    content: "Dynamic content 1. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  }, {
    title: "Disabled Tab",
    content: "Dynamic content 2. Can't show",
    disabled: true
  }];

  // progressbar
  public max: number = 200;
  public showWarning: boolean;
  public dynamic: number;
  public type: string;
  public stacked: any[] = [];

  public random() {
    let value = Math.floor((Math.random() * 100) + 1);
    let type: string;

    if (value < 25) {
      type = 'success';
    } else if (value < 50) {
      type = 'info';
    } else if (value < 75) {
      type = 'warning';
    } else {
      type = 'danger';
    }

    this.showWarning = (type === 'danger' || type === 'warning');
    this.dynamic = value;
    this.type = type;
  }

  public randomStacked() {
    let types = ['success', 'info', 'warning', 'danger'];

    this.stacked = [];
    let total = 0;
    let n = Math.floor((Math.random() * 4) + 1);
    for (let i = 0; i < n; i++) {
      let index = Math.floor((Math.random() * 4));
      let value = Math.floor((Math.random() * 30) + 1);
      total += value;
      this.stacked.push({
        value: value,
        max: value, // i !== (n - 1) ? value : 100,
        type: types[index]
      });
    }
  }
}
