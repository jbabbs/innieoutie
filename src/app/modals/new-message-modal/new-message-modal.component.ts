import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from '../../redux/message/message.model';

@Component({
  selector: 'app-new-message-modal',
  templateUrl: './new-message-modal.component.html',
  styleUrls: ['./new-message-modal.component.scss']
})
export class NewMessageModalComponent implements OnInit {
  public title = 'New Message';
  public form: FormGroup;
  public errors: string;
  public initial: any = { };

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.initial.name, Validators.required],
      stringify: this.initial.stringify,
      data: [this.initial.data, Validators.required],
    });
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
