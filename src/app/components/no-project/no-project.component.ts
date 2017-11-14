import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewProjectModalComponent } from '../modals/new-project-modal/new-project-modal.component';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-no-project',
  templateUrl: './no-project.component.html',
  styleUrls: ['./no-project.component.scss']
})
export class NoProjectComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private dbService: DbService,
  ) { }

  ngOnInit() {

  }

  onNewProjectClick() {
    const modalRef = this.modalService.open(NewProjectModalComponent);
    modalRef.result.then(projectName => {
      this.dbService.createProjectAndSetActive(projectName);
    }).catch(err => {
      // modal dismissed
    });
  }

}
