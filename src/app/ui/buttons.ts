import { Component } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './app/ui/buttons.html',
})

export class ButtonsComponent {
  public disabled: boolean = false;
  public status: { isopen: boolean } = { isopen: false };

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
}
