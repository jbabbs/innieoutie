import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-select-port-modal',
  templateUrl: './select-port-modal.component.html',
  styleUrls: ['./select-port-modal.component.scss']
})
export class SelectPortModalComponent implements OnInit {

  public portNumber: number;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
