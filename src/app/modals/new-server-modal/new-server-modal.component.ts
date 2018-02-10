import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-server-modal',
  templateUrl: './new-server-modal.component.html',
  styleUrls: ['./new-server-modal.component.scss']
})
export class NewServerModalComponent implements OnInit {
  public form: FormGroup;
  public errors: string;
  public title = 'New Server';
  public initial: any = { };

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      url: ['ws://demos.kaazing.com/echo', Validators.required],
      protocolString: '',
    });
    this.form.patchValue(this.initial);
  }

  onSaveClick() {
    this.errors = '';
    if (!this.form.valid) {
      this.errors = 'A required field is missing';
      return;
    }
    this.activeModal.close(this.form.value);
  }

}
