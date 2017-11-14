import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-connection-modal',
  templateUrl: './new-connection-modal.component.html',
  styleUrls: ['./new-connection-modal.component.scss']
})
export class NewConnectionModalComponent implements OnInit {
  public form: FormGroup;
  public errors: string;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      url: ['demos.kaazing.com/echo', Validators.required],
      protocolString: '',
    })
  }

  ngOnInit() {

  }

  onSaveClick() {
    this.errors = '';
    if (!this.form.valid) {
      this.errors = 'Form not valid';
      return;
    }
    this.activeModal.close(this.form.value);
  }

}
