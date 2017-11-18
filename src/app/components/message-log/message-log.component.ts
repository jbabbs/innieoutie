import { Component, Inject, Input, OnInit } from '@angular/core';
import { Client } from '../../redux/client/client.model';
import { AppStore } from '../../redux/app.store';
import { AppState } from '../../redux/app.reducer';
import { Store } from 'redux';
import { ClientMessage, ClientMessageDirection } from '../../redux/client/client-message.model';

@Component({
  selector: 'app-message-log',
  templateUrl: './message-log.component.html',
  styleUrls: ['./message-log.component.scss']
})
export class MessageLogComponent implements OnInit {
  @Input() public client: Client;

  constructor(@Inject(AppStore) private store: Store<AppState> | null) {
    this.store.subscribe(() => this.onStateChange());
  }

  ngOnInit() {

  }

  onStateChange() {
  }

  messageDirection(message: ClientMessage) {
    switch (message.direction) {
      case ClientMessageDirection.SENT:
        return 'SEND';
      case ClientMessageDirection.RECEIVED:
        return 'RCV';
      default:
        return '';
    }
  }

}
