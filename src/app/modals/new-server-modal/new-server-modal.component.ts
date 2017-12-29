import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EchoServerUrl } from '../../../constants';

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
      isEchoServer: false,
      protocolString: '',
    });
    this.form.patchValue(this.initial);
    this.onIsEchoServerChange();
  }

  onSaveClick() {
    this.errors = '';
    if (!this.form.valid) {
      this.errors = 'A required field is missing';
      return;
    }
    if (this.form.value.isEchoServer) {
      this.form.controls.url.enable();
      this.form.patchValue({url: EchoServerUrl});
    }
    this.activeModal.close(this.form.value);
  }

  onIsEchoServerChange() {
    if (this.form.value.isEchoServer) {
      this.form.controls.url.disable();
    } else {
      this.form.controls.url.enable();
    }
  }

}
