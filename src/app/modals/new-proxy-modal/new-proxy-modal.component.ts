import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EchoServerUrl } from '../../../constants';

@Component({
  selector: 'app-new-proxy-modal',
  templateUrl: './new-proxy-modal.component.html',
  styleUrls: ['./new-proxy-modal.component.scss']
})
export class NewProxyModalComponent implements OnInit {

  public form: FormGroup;
  public errors: string;
  public title = 'New Proxy';
  public initial: any = { };

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      url: ['ws://demos.kaazing.com/echo', Validators.required],
      isEchoServer: false,
      listenPort: [8081, Validators.required],
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
