import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  showModal = false;
  userProps;
  op_type;
  projectProps = null;

  allUsers: Array<{}>;
  currentEditingUserRecord;
  
  USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user'
  };

  allOpTypes = {
    addUser: 'addUser',
    editUser: 'editUser',
  };

  TOAST_OPTIONS = {
    SUCCESS: {
        text: 'CLOSE',
        duration: 5000,
        type: 'success',
    },
    FAILURE: {
        text: 'CLOSE',
        duration: 5000,
        type: 'error',
    }
  };

  constructor(
                private userService: UsersService
            ) { }

  ngOnInit() {

    this.fetchAllUsersRecord();

  }

  saveOperation($event) {

    console.log($event);
    switch ($event['op_type']) {

      case this.allOpTypes.addUser:
        this.registerUser($event.props);
        break;

      case this.allOpTypes.editUser:
        this.updateUserRecord($event.props);
        break;

      default:
      break;
    }

  }

  userTrackByFunction(index, user) {
    return user;
  }

  fetchAllUsersRecord(){

    this.userService.fetchAllUsersRecord()
        .subscribe((response) => {

            this.allUsers = response.users;

        },
        (error) => console.log(error));

  }

  displayAddUserForm(){

    this.op_type = this.allOpTypes.addUser;

    this.userProps = {
      op_type: this.op_type,
      tempPasswordConfirm: '',
      props: {
        name: null,
        skill: null,
        password: null,
        role: this.USER_ROLES.USER,
        email: null,
      }
    }

    this.showModal = true;

  }

  editUser(user){

      this.currentEditingUserRecord = user;

      this.userProps = {
        props:user,
        op_type: this.allOpTypes.editUser
      };

      this.showModal = true;

  }

  isAdmin(){

      return JSON.parse(window.localStorage.getItem('user')).role.trim().toLowerCase() == 'admin';

  }

  deleteUser(user) {

      const response = confirm("Are you sure you want to delete user " + user.name );

      if(response == true){

          // Delete user from database
          this.userService.deleteUser(user)
              .subscribe((response) => {
                  

                  if(!response.error){

                      this.displayToast(response.message, this.TOAST_OPTIONS.SUCCESS);

                      // Remove from the list of users in the component
                      this.allUsers.splice(this.allUsers.indexOf(user), 1);

                  }
                  else{

                      // Failed to delete user
                      this.displayToast(response.message, this.TOAST_OPTIONS.FAILURE);

                  }
                      
              });

      }

  }

  updateUserRecord(user){

      this.userService.updateUserRecord(user)
          .subscribe((response) => {
            console.log(response);
              if(response.success){

                  this.displayToast(response.message, this.TOAST_OPTIONS.SUCCESS);

                  this.updateUserRecordInListOfUsers(response.user);
              }
              else{

                  this.displayToast(response.message, this.TOAST_OPTIONS.FAILURE);                             

              }

              
          });

  }

  updateUserRecordInListOfUsers(user){

      // removes the user from the allUsers variable in this component
      this.allUsers.splice(this.allUsers.indexOf(this.currentEditingUserRecord), 1);

      this.allUsers.push(user);

  }

  registerUser(user){
    
      //console.log('registering user');

      this.userService.registerUser(user)
              .subscribe((response) => {
                  console.log(response);
                  if(response.success){

                      this.displayToast(response.message, this.TOAST_OPTIONS.SUCCESS);

                      this.allUsers.push(response.user);

                  }
                  else{

                      this.displayToast(response.message, this.TOAST_OPTIONS.FAILURE);

                  }

              },
              (err) => {

                  console.log(err);

                  this.displayToast(err, this.TOAST_OPTIONS.FAILURE);

              });
  }

  displayToast(message, options){

      
      
  }
}
