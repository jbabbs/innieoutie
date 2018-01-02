import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {
  public error: Error;
  public title = 'Uh-oh!';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
