import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    const { name, url, protocolString, isEchoServer } = this.initial;
    this.form = this.fb.group({
      name: [name || '', Validators.required],
      url: [url || 'ws://demos.kaazing.com/echo', Validators.required],
      isEchoServer: !!isEchoServer,
      protocolString: protocolString || '',
    })
    this.onIsEchoServerChange();
  }

  onSaveClick() {
    this.errors = '';
    if (!this.form.valid) {
      this.errors = 'A required field is missing';
      return;
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
