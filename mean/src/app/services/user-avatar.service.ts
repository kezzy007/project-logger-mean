import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class UserAvatarService {

  @Output() avatarChange = new EventEmitter<any>();

  constructor() { }

  getUserAvatar(user){}

  notifyAvatarChange(avatar) {

    this.avatarChange.emit(avatar);

  }

}
