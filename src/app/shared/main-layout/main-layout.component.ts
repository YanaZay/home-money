import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  public showSidebar: boolean = true;

  public toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
}
