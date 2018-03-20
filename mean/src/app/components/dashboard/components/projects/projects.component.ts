import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectsService } from './services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projectAndLogs;
  projects;
  projectProps = {title: '', description: ''};
  displayModal = false;
  EVENTS = {
    ADD_PROJECT: 'add_project'
  };

  @Output() projectsEvent = new EventEmitter<any>();

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {

    this.getProjectsAndLogs();

  }

  getProjectsAndLogs() {

    this.projectsService.getProjectsAndLogs()
        .subscribe( (response) => {
            console.log(response);
            this.projectAndLogs = response;
        });
  }

  addProject() {

    this.displayModal = true;

  }
}
