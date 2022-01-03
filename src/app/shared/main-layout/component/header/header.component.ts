import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { AuthService } from '../../../../pages/auth/auth.service';
import { isLoggedInSelector } from '../../../../pages/auth/store/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() public toggle: EventEmitter<void> = new EventEmitter<void>();
  public isLoggedIn$!: Observable<boolean | null>;

  constructor(private authService: AuthService, private store: Store) {}

  public ngOnInit(): void {
    this.initializeValue();
  }

  private initializeValue(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }

  public logout(): void {
    this.authService.logout();
  }
}
