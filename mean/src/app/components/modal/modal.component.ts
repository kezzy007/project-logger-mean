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
  op_type = null;
  allOpTypes = {
    addLog: 'addLog',
    addProject: 'addProject',
    viewLog: 'viewLog',
    assignUsers: 'assignUsers',
    addUser: 'addUser',
    editUser: 'editUser',
  };
  USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user'
  };

  constructor() { }

  ngOnInit() {

   // this.showModal();
   this.op_type = this.projectProps.op_type;

  }

  showModal() {
    // console.log('showing modal');
    this.basicModal.show();
  }

  closeModal() {

    this.basicModal.hide();
    this.modalClosed.emit('closed');

  }

  saveOperation($receivedValue) {

    if (this.op_type === this.allOpTypes.viewLog) {
      console.log("received value", $receivedValue);
      this.projectProps.multi_props.log_admin_response = $receivedValue;

    }


    this.modalDone.emit(this.projectProps);

  }

  isAdmin() {

    return this.projectProps.multi_props.userRole.toLowerCase() === this.USER_ROLES.ADMIN;

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
