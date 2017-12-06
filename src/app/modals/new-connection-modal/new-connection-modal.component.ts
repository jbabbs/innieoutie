import { Component, Input, OnInit } from '@angular/core';
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
  public title = 'New Connection';
  public initial: any = { };

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {

  }

  ngOnInit() {
    const { name, url, protocol } = this.initial;
    this.form = this.fb.group({
      name: [name || '', Validators.required],
      url: [url || 'demos.kaazing.com/echo', Validators.required],
      protocolString: protocol || '',
    })
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
