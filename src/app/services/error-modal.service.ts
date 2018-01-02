import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';

@Injectable()
export class ErrorModalService {

  constructor(private modalService: NgbModal) {

  }

  showErrorModal(error: Error, title?: string) {
    const modalRef = this.modalService.open(ErrorModalComponent, {size: 'lg'});
    modalRef.componentInstance.error = error;
    modalRef.componentInstance.title = title;
  }
}
