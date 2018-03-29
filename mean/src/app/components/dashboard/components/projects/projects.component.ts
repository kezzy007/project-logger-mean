import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectsService } from './services/projects.service';

interface Iresponse {
  success: string;
  log?: Object;
  projects?: Array<{}>;
  logs?: Array<{}>;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects;
  logs;
  projectProps;
  currentProject;
  currentViewingLog;
  userRole;
  EVENTS = {
    ADD_PROJECT: 'add_project'
  };

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

  logStatuses = {
    REVIEW: 'review',
    PENDING: 'pending',
    SEEN: 'seen'
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

  showModal = false;

  @Output() projectsEvent = new EventEmitter<any>();

  constructor(private projectsService: ProjectsService) {

      this.initializeInstanceVariables();

  }

  ngOnInit() {

    this.setUserRole();

    this.getProjectsAndLogs();

  }

  setUserRole() {
    this.userRole = JSON.parse(localStorage.getItem('user')).role;
  }

  getProjectsAndLogs() {

    this.projectsService.getProjectsAndLogs()
        .subscribe( (response: Iresponse) => {
            console.log(response);

              this.projects = response.projects;
              this.logs = response.logs;

        },
        (error) => console.log("error : " + error.response));
  }

  initializeInstanceVariables() {

    this.projects = [];
    this.logs = [];
    this.projectProps = {
      title: '',
      description: '',
      log_text: '',
      multi_props: null,
      op_type: null};

  }

  saveOperation($event) {
    console.log($event);

    switch ($event['op_type']) {

      case this.allOpTypes.addProject:
        this.saveProject($event);
        break;

      case this.allOpTypes.addLog:
        this.saveLogForProject($event);
        break;

      case this.allOpTypes.viewLog:
        this.markLogAs($event);
        break;

      default:
      break;
    }

  }

  addNewProjectModal() {

    this.projectProps.op_type = this.allOpTypes.addProject;

    this.displayModal();

  }

  displayToast(message, options) {

  }

  markLogAs(adminResponse) {

    const log = {
                  'log_id': this.currentViewingLog.log._id, 
                  'log_status': adminResponse.multi_props.log_admin_response 
                };

    this.projectsService.saveLogStatus(log)
        .subscribe((response) => {

          if (response.success) {

            this.currentViewingLog.log.log_status = response.log.log_status;

            this.displayToast('Log marked as ' + log.log_status.toLowerCase(), this.TOAST_OPTIONS.SUCCESS);
          } else {

            this.displayToast('Operation failed', this.TOAST_OPTIONS.FAILURE);

          }

        },
        (error) => console.log(error));

  }

  saveProject(project) {

    delete project['op_type'];

    this.projectsService.saveProject(project)
        .subscribe((response) => {

          if (response.success) {
            this.projects.push(response['project']);
            // console.log(response);
            this.displayToast('Project created', this.TOAST_OPTIONS.SUCCESS );

            return;
          }

          this.displayToast('Operation failed', this.TOAST_OPTIONS.FAILURE);

        });
  }

  saveLogForProject(log) {

    const logobject = {
      'project_id': this.currentProject._id,
      'user': this.getUser(),
      'log_message': log.log_text,
      'log_status': this.logStatuses.PENDING
    };

    this.projectsService.saveLogForProject(logobject)
        .subscribe((response: Iresponse) => {

          // console.log(response);
          this.logs.push(response.log);

        });
  }

  deleteLog($event, project, log) {

    $event.stopPropagation();

    this.projectsService.deleteLog({ 'logId': log._id })
        .subscribe((response) => {

          if (response.success) {

            this.removeLogFromProject(log);

            this.displayToast(response.message, this.TOAST_OPTIONS.SUCCESS);

        } else {
            this.displayToast(response.message, this.TOAST_OPTIONS.FAILURE);
        }

    });

  }

  removeLogFromProject(log) {

    this.logs.splice(this.logs.indexOf(log), 1);

  }

  getUser() {

    return JSON.parse(localStorage.getItem('user'));

  }

  getDatePublished(log){

    var date = log.createdAt.replace('T', ' ');

    return date;

  }

  logFor(project) {

    this.currentProject = project;

    this.projectProps.op_type = this.allOpTypes.addLog;

    this.displayModal();

  }

  logTrackFunction(index) {
    return index;
  }

  displayModal() {
    this.showModal = true;
  }

  viewLog(project, log) {

      // Save log being currently viewed
      this.currentViewingLog = {'project': project,
                                'log': log,
                                'userRole': this.userRole,
                                'log_admin_response': null,
                                'logEditingDisabled': this.isAdmin() };

      this.projectProps.multi_props = this.currentViewingLog;

      this.projectProps.op_type = this.allOpTypes.viewLog;

      // Send the log to modal
      this.displayModal();

  }

  isAdmin() {

    return this.userRole.toLowerCase() === this.USER_ROLES.ADMIN;

  }

}
