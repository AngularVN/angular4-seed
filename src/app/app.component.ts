import { Component, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <div>
        <app-header class="app-header"></app-header>
        <app-sidebar class="app-aside"></app-sidebar>
      </div>
      <div class="app-wrapper">
        <div class="app-content">
          <router-outlet></router-outlet>
          <app-footer></app-footer>
        </div>
      </div>
      <!-- <toaster-container></toaster-container> -->
    </div>`,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor() {}
}
