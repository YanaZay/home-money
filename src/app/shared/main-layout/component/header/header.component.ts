import { Component, EventEmitter, Output } from '@angular/core';
import {AuthService} from "../../../../pages/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() public toggle: EventEmitter<void> = new EventEmitter<void>();

  constructor(private authService: AuthService,) {}

  public logout(): void {
    this.authService.login();
  }
}
