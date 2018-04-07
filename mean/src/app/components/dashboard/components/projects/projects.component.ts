import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular5-toaster';
import { ProjectsService } from './services/projects.service';
import { User } from '../../../../classes/user';

interface Iresponse {
  success: string;
  message?: string;
  log?: Object;
  projects?: Array<{}>;
  logs?: Array<{}>;
  project_users?: Array<{}>;
  all_users?: Array<{}>;
}

interface IGeneralResp{
  success: boolean;
  message: string;

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
  userProps;
  currentProject;
  currentViewingLog;
  userRole;
  allUsers;
  allProjectAssignedUsers;
  EVENTS = {
    ADD_PROJECT: 'add_project'
  };

  allOpTypes = {
    addLog: 'addLog',
    addProject: 'addProject',
    viewLog: 'viewLog',
    assignUsers: 'assignUsers',
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

  showCollapsible;

  @Output() projectsEvent = new EventEmitter<any>();

  public toasterconfig: ToasterConfig =  new ToasterConfig({
                                              showCloseButton: true,
                                              tapToDismiss: true,
                                              timeout: 3000
                                          });

  constructor(
                private projectsService: ProjectsService,
                private toasterService: ToasterService
              ) {

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
              this.allUsers = response.all_users;
              this.allProjectAssignedUsers = response.project_users;

              this.initializeCollapsibleArray();
        }, (error) => {
          console.log(error.statusText);
         // this.displayToast('Operation failed', this.TOAST_OPTIONS.FAILURE);
        });
  }

  initializeCollapsibleArray() {

    this.showCollapsible = Array(this.projects.length);
    this.showCollapsible.map((collapsible) => false);

  }

  toggleCollapse(i) {

    this.showCollapsible[i] = !this.showCollapsible[i];

  }

  assignUsers(project) {

    this.currentProject = project;

    // Display loading icon 
    this.displayLoadingIcon();

    const projectAssignedUsers: Array<User> = this.getProjectAssignedUsers(this.currentProject);

    console.log(projectAssignedUsers);

    this.projectProps = {
      op_type: this.allOpTypes.assignUsers,
      props: {
          project_title: project.title, 
          allUsers: this.allUsers, 
          projectAssignedUsers: projectAssignedUsers,
          selectedUsersList: []
      }
    };

    this.showModal = true;

  }

  getProjectAssignedUsers(project) {

    const result = [];

    this.allProjectAssignedUsers.forEach((projAssUsers) => {

      if (project._id === projAssUsers.project_id) {

        result.push(projAssUsers.user);

      }

    });

    return result;
  }

  displayLoadingIcon() {

  }

  modalClosed() {

    this.showModal = false;
    this.resetProjectProps();

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

      case this.allOpTypes.assignUsers:
      this.saveAssignedUsersForProject($event.props.selectedUsersList);
      break;

      default:
      break;
    }

  }

  resetProjectProps() {

    Object.keys(this.projectProps)
    .forEach((projectPropsKey) => {
        this.projectProps[projectPropsKey] = '';
    });

  }

  addNewProjectModal() {

    this.projectProps.op_type = this.allOpTypes.addProject;

    this.displayModal();

  }

  displayToast(message, options) {

      this.toasterService.pop(
                                options.type,
                                'New notification',
                                !message && (options.type === 'failure') ?
                                'Operation failed' : message || 'Operation successful'
                              );

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
        (error) => {
                      console.log(error.statusText);
                      this.displayToast('Operation failed', this.TOAST_OPTIONS.FAILURE);
                    });

  }

  saveProject(project) {

    // console.log(project);

    const projectClone = JSON.parse(JSON.stringify(project));

    delete projectClone['op_type'];

    this.projectsService.saveProject(projectClone)
        .subscribe((response) => {

          // this.resetProjectProps();

          if (response.success) {
            this.projects.push(response['project']);
            // console.log(response);
            this.displayToast('Project created', this.TOAST_OPTIONS.SUCCESS );

            return;
          }

          this.displayToast('Operation failed', this.TOAST_OPTIONS.FAILURE);

        },
        (error) => {
          console.log(error.statusText);
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

          // this.resetProjectProps();

          if (!response.success) {

            this.displayToast(response.message, this.TOAST_OPTIONS.FAILURE);

            return;
          }

          this.logs.push(response.log);

          this.displayToast(response.message, this.TOAST_OPTIONS.SUCCESS);

        },
        (error) => {
          console.log(error.statusText);
          this.displayToast('Operation failed', this.TOAST_OPTIONS.FAILURE);
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

      }, (error) => {
        console.log(error.statusText);
        this.displayToast('Operation failed', this.TOAST_OPTIONS.FAILURE);
      });

  }

  removeLogFromProject(log) {

    this.logs.splice(this.logs.indexOf(log), 1);

  }

  saveAssignedUsersForProject(assignedUsers){

    // //console.log({assignedUsers: assignedUsers, projectId: this.currentProject.id});
    const userArray = [];

    assignedUsers.forEach((user) => {

        userArray.push({project_id: this.currentProject._id, user: user});

    });

    this.projectsService
        .saveAssignedUsers(
          {
            assignedUsers: userArray,
            project_id: this.currentProject._id
          }
        )
        .subscribe((response: IGeneralResp) => {

            console.log(response);

            if (response.success) {
                this.displayToast(response.message, this.TOAST_OPTIONS.SUCCESS);
            } else {
                this.displayToast(response.message, this.TOAST_OPTIONS.FAILURE);
            }

        }, (error) => {
          console.log(error.statusText);
          this.displayToast('Operation failed', this.TOAST_OPTIONS.FAILURE);
        });

  }

  getUser() {

    return JSON.parse(localStorage.getItem('user'));

  }

  getDatePublished(log) {

    const date = log.createdAt.replace('T', ' ');

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
