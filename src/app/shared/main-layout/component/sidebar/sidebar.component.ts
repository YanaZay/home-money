import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ICurrentUser } from '../../../types/current-user.interface';
import {
  currentUserSelector,
  isLoggedInSelector,
} from '../../../../pages/auth/store/selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public currentUser$!: Observable<ICurrentUser | null>;
  public isLoggedIn$!: Observable<boolean | null>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.initializeValue();
  }

  private initializeValue(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
  }
}
