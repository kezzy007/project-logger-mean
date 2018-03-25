import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectsService } from './services/projects.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projectsAndLogs: Array<any>;
  projects = null;
  projectProps;
  displayModal = false;
  currentProject;
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

  showModal = false;

  @Output() projectsEvent = new EventEmitter<any>();

  constructor(private projectsService: ProjectsService) { 

      this.initializeInstanceVariables();

  }

  ngOnInit() {

    this.getProjectsAndLogs();

  }

  getProjectsAndLogs() {

    this.projectsService.getProjectsAndLogs()
        .subscribe( (response) => {
            console.log(response);

              this.projectsAndLogs = response['projectsAndLogs'];

        },
        (error) => console.log(error.response));
  }

  initializeInstanceVariables() {

    this.projectsAndLogs = [];
    this.projectProps = {title: '', description: '', op_type: this.allOpTypes.addProject};

  }

  saveOperation($event) {
    console.log($event);

    switch ($event['op_type']) {
      case this.allOpTypes.addProject:
        this.saveProject($event);
    }

  }

  saveProject(project) {

    delete project['op_type'];

    this.projectsService.saveProject(project)
        .subscribe((response) => {

          console.log(response);


        });

  }

  logFor(project) {

    this.currentProject = project;

    this.projectProps.project = project;
  }

}
