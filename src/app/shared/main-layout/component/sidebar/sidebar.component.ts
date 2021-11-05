import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../models/user.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public user!: IUser;

  public ngOnInit(): void {
    this.user = JSON.parse(<string>localStorage.getItem('user'));
  }
}
