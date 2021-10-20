import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../user.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public user!: IUser;

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(<string>localStorage.getItem('user'));
    console.log(this.user)
  }

}
