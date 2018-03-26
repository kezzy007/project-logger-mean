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
        (error) => console.log(error.response));
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

      default:
      break;
    }

  }

  addNewProjectModal() {

    this.projectProps.op_type = this.allOpTypes.addProject;

    this.displayModal();

  }

  displayToast(message) {



  }

  saveProject(project) {

    delete project['op_type'];

    this.projectsService.saveProject(project)
        .subscribe((response) => {

          if(response.success) {
            this.projects.push(response['project']);
            console.log(response);
            this.displayToast('Project created');

            return;
          }

          this.displayToast('Operation failed');

        });
  }

  saveLogForProject(log) {

    const logobject = {
      'project_id': this.currentProject._id,
      'user': this.getUser(),
      'log_message': log.log_text
    };

    this.projectsService.saveLogForProject(logobject)
        .subscribe((response: Iresponse) => {

          console.log(response);
          this.logs.push(response.log);

        });
  }

  getUser() {

    return JSON.parse(localStorage.getItem('user'));

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
                                'logEditingDisabled': this.userRole.toLowerCase() === this.USER_ROLES.ADMIN };

      this.projectProps.multi_props = this.currentViewingLog;

      this.projectProps.op_type = this.allOpTypes.viewLog;

      // Send the log to modal
      this.displayModal();

  }

  showBsCollapse() {}

  shownBsCollapse() {}

  hideBsCollapse() {}

  hiddenBsCollapse() {}
}
