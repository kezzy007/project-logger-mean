import { Component, OnInit } from '@angular/core';
import { UserAvatarService } from '../../services/user-avatar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userAvatar;

  constructor() { }

  ngOnInit() {

    this.getAndSubscribeToUserAvatarOnChange();

  }

  getAndSubscribeToUserAvatarOnChange(){



  }

}
