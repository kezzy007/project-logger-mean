import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() modalClosed = new EventEmitter<any>();
  @Output() modalDone = new EventEmitter<any>();


  @ViewChild('basicModal') public basicModal;
  @Input() projectProps;
  @Input() userProps;
  passwordsMatch: boolean;
  usersAssignedForProject;
  tempPasswordConfirm = '';
  op_type = null;
  allOpTypes = {
    addLog: 'addLog',
    addProject: 'addProject',
    viewLog: 'viewLog',
    assignUsers: 'assignUsers',
    addUser: 'addUser',
    editUser: 'editUser'
  };
  USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user'
  };

  constructor() {

    

  }

  ngOnInit() {

   // this.showModal();
   this.op_type = this.projectProps ? 
   this.projectProps.op_type : this.userProps.op_type;

    switch(this.op_type){
    case this.allOpTypes.assignUsers:
    this.sortUserAssignedForProject();
    break;

    default:
    break;
    }

  }

  showModal() {
    // console.log('showing modal');
    this.basicModal.show();
  }

  closeModal() {

    this.basicModal.hide();
    this.modalClosed.emit('closed');

  }

  saveOperation($receivedValue?) {

    if (this.op_type === this.allOpTypes.viewLog) {
      console.log("received value", $receivedValue);
      this.projectProps.multi_props.log_admin_response = $receivedValue;

    }

    // Check if using projectProps from project component
    // If not emits userProps from user component
    this.projectProps ? this.modalDone.emit(this.projectProps) :
                         this.modalDone.emit(this.userProps) ;

  }

  updateUserRole($event, roleType){

    //console.log($event.target.checked, roleType);

    if($event.target.checked){

        this.userProps.props.role = roleType; 

    }

  }

  confirmPasswordsMatch(){
    this.passwordsMatch = this.userProps.props.password == this.userProps.tempPasswordConfirm;
  }

  togglePasswordVisibility($event, fieldId) {

      var passwordField = document.getElementById(fieldId);

      const toggledType = passwordField.getAttribute('type') == "password" ? "text" : "password";        

      passwordField.setAttribute('type', toggledType);

      // Toggle the eye icon
      $event.target.classList = $event.target.classList.contains('fa-eye')  ? 
                                  'fa fa-eye-slash grey-text' :  'fa fa-eye grey-text';

  }

  validateUserAssignedForProject(user, index) {

    this.projectProps.props.projectAssignedUsers.find((projAssUsers) => {

      if (projAssUsers._id === user._id) {

        this.usersAssignedForProject[index] = 'checked';

        this.projectProps.props.selectedUsersList.push(user);

      } else {

        this.usersAssignedForProject[index] = '';

      }

      return;
    });

    // return false;
  }

  sortUserAssignedForProject() {

    this.usersAssignedForProject = Array(this.projectProps.props.allUsers.length);

    this.projectProps.props.allUsers
        .forEach((user, index) => {

           this.validateUserAssignedForProject(user, index);

        });

        console.log(this.usersAssignedForProject);
  }

  toggleUserSelectionState(user) {

    console.log('selected users list', this.projectProps.props.selectedUsersList);

    if (this.userSelected(user)) {

        console.log('removing user');

        this.removeUserFromSelection(user);

    } else {

        this.addUserToSelection(user);

    }

  }

  userSelected(user) {

    // returns true if user's index is !== -1
    return !(this.projectProps.props.selectedUsersList.indexOf(user) === -1);

  }

  addUserToSelection(user){

      if( !this.userSelected(user) )
          this.projectProps.props.selectedUsersList.push(user);
      
  }

  removeUserFromSelection(user){

    console.log('removing user', this.projectProps.props.selectedUsersList);
      this.projectProps.props.selectedUsersList
          .splice(this.projectProps.props.selectedUsersList.indexOf(user), 1);

    console.log('removed user', this.projectProps.props.selectedUsersList);
  }

  isAdmin() {

    return JSON.parse(localStorage.getItem('user')).role.toLowerCase() === this.USER_ROLES.ADMIN;

  }

  isAddNewProject() {
    return this.op_type === this.allOpTypes.addProject;
  }

  isAddLog() {
      return this.op_type === this.allOpTypes.addLog;
  }

  isViewLog() {
    return this.op_type === this.allOpTypes.viewLog;
  }

  isAssignUsers() {
      return this.op_type === this.allOpTypes.assignUsers;
  }

  isAddUser() {
      return this.op_type === this.allOpTypes.addUser;
  }

  isEditUser() {
      return this.op_type === this.allOpTypes.editUser;
  }
}
