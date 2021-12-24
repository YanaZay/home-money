import { Component, OnInit } from '@angular/core';
import { ICurrentUser } from '../../../models/currentUser.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public user!: ICurrentUser;

  public ngOnInit(): void {
    this.user = JSON.parse(<string>localStorage.getItem('user'));
  }
}
