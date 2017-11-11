import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { ProjectDBService } from '../../services/db/project-db.service';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { CurrentProjectService } from '../../services/current-project.service';

@Component({
  selector: 'app-no-project',
  templateUrl: './no-project.component.html',
  styleUrls: ['./no-project.component.scss']
})
export class NoProjectComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private projectDBService: ProjectDBService,
    private currentProjectService: CurrentProjectService,
  ) { }

  ngOnInit() {

  }

  onNewProjectClick() {
    const modalRef = this.modalService.open(ProjectModalComponent);
    modalRef.result.then(async projectName => {
      try {
        const project = await this.projectDBService.create(projectName);
        this.currentProjectService.set(project);
      } catch (e) {
        this.modalService.open(ErrorModalComponent);
      }
    }).catch(err => {
      // modal dismissed
    });
  }

}
