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
  public title: 'New Message'|'Edit Message' = 'New Message';
  public errors: { [key: string]: string } = { file: '', string: '', name: '' };
  public formValue = { file: null, type: 'string', string: '', name: '' };

  constructor(public activeModal: NgbActiveModal) {

  }

  ngOnInit() {

  }

  onFileChange(file) {
    this.formValue.file = file;
  }

  isValid() {
    const { type, file, string, name } = this.formValue;
    if (!type) {
      return false;
    }
    if (type === 'file' && !file) {
      return false;
    }
    if (type === 'string' && !string) {
      return false;
    }
    if (!name) {
      return false;
    }
    return true;
  }

  showErrors() {
    const { type, file, string, name } = this.formValue;
    if (!type) {
      this.errors.type = 'Type cannot be blank';
    } else {
      if (type === 'file' && !file) {
        this.errors.file = 'File cannot be blank';
      }
      if (type === 'string' && !string) {
        this.errors.string = 'Data cannot be blank';
      }
    }
    if (!name) {
      this.errors.name = 'Name cannot be blank';
    }
  }

  onSaveClick() {
    this.errors = { };

    if (!this.isValid()) {
      this.showErrors();
      return;
    }

    this.activeModal.close(this.formValue);
  }

}
