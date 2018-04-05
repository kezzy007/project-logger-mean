import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAvatarService } from '../../services/user-avatar.service';

interface IUser {
  profile_pic?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userAvatar;
  folderPath = '../uploads/profile-pics/';
  tempAvatar = 'avatar.png';

  constructor(
              private userAvatarService: UserAvatarService,
              private router: Router
            ) { }

  ngOnInit() {

    // To verify if authenticated
    if (!this.getUser()) {

      this.router.navigateByUrl('/');

    }

    // Sets the profile pic of user if exists
    ( (userProfilePic) => {

      this.userAvatar = (userProfilePic != null && userProfilePic !== '') ? userProfilePic : this.tempAvatar;

    })(this.getUser().profile_pic);

  }

  getAndSubscribeToUserAvatarOnChange() {


    this.userAvatarService.avatarChange
        .subscribe( (avatar) => {

          console.log(avatar);

          this.userAvatar = avatar;

        });

  }

  getUser(): IUser {

    return JSON.parse(localStorage.getItem('user'));

  }

}
