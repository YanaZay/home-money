import { Component, isDevMode, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { getCurrentUserAction } from './pages/auth/store/actions/get-current-user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'home-money';

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction());

    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
  }
}
