import { Component, OnInit } from '@angular/core';
import { IUserResponse } from '../../../models/userResponse.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public user!: IUserResponse;

  public ngOnInit(): void {
    this.user = JSON.parse(<string>localStorage.getItem('user'));
  }
}
