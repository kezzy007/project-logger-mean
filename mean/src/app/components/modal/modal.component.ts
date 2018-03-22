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

  saveProject() {

    console.log(this.projectProps);

    this.modalDone.emit(this.projectProps);
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
