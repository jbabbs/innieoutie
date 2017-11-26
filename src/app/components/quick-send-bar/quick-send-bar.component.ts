import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../redux/client/client.model';
import { WebSocketService } from '../../services/web-socket.service';
import { AppStore } from '../../redux/app.store';
import { Store } from 'redux';
import { AppState } from '../../redux/app.reducer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-quick-send-bar',
  templateUrl: './quick-send-bar.component.html',
  styleUrls: ['./quick-send-bar.component.scss']
})
export class QuickSendBarComponent implements OnInit {
  @Input() client: Client;
  @Input() message: string;
  @Input() validate: boolean;
  @ViewChild('input') inputElRef: ElementRef;
  public validationState: 'valid'|'typing'|'invalid'|'empty' = 'empty';
  public validationMessage = '';

  constructor(
    private wsService: WebSocketService,
    @Inject(AppStore) store: Store<AppState> | null
  ) { }

  ngOnInit() {
    Observable.fromEvent(this.inputElRef.nativeElement, 'keyup')
      .filter(() => this.validate)
      .do(() => {
        this.validationState = 'typing';
      })
      .debounceTime(1000)
      .subscribe(
        () => {
          try {
            JSON.parse(this.message);
            this.validationState = 'valid';
          } catch (err) {
            this.validationMessage = err.message;
            this.validationState = 'invalid';
          }
        }
      )

  }

  onSendClick($event) {
    this.wsService.sendMessage(this.message, this.client);
    $event.preventDefault();
  }

  isSendDisabled() {
    let connected = false;
    if (this.client.socket && this.client.socket.readyState === WebSocket.OPEN) {
      connected = true;
    }

    if (!connected) {
      return true;
    }

    if (this.validate) {
      return !this.message || this.validationState !== 'valid';
    } else {
      return !this.message;
    }

  }

  getValidationIcon() {
    if (!this.message) {
      return 'fa-ellipsis-h';
    }
    switch (this.validationState) {
      case 'typing': return 'fa-ellipsis-h';
      case 'invalid': return 'fa-warning';
      case 'empty':
      case 'valid':
      default:
        return 'fa-check';
    }
  }

  getValidationColor() {
    if (!this.message) {
      return 'black';
    }
    switch (this.validationState) {
      case 'typing': return 'black';
      case 'invalid': return 'black';
      case 'empty':
      case 'valid':
      default:
        return 'green';
    }
  }

  onEnterUp($event) {
    this.onSendClick($event);
  }

  shouldShowValidationMessage() {
    console.log()
    return this.validate && this.validationState === 'invalid';
  }
}
