import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Client } from '../../redux/client/client.model';
import { AppStore } from '../../redux/app.store';
import { AppState } from '../../redux/app.reducer';
import { Store } from 'redux';
import { ClientMessage, ClientMessageDirection } from '../../redux/client/client-message.model';
import { formatTime } from '../../utils/time';

@Component({
  selector: 'app-message-log',
  templateUrl: './message-log.component.html',
  styleUrls: ['./message-log.component.scss']
})
export class MessageLogComponent implements OnInit, OnDestroy {
  @Input() public client: Client;
  private storeUnsubscribe: any;

  constructor(@Inject(AppStore) private store: Store<AppState> | null) {
    this.storeUnsubscribe = this.store.subscribe(() => this.onStateChange());
  }

  ngOnInit() {
    console.log('init this tab');
  }

  ngOnDestroy() {
    this.storeUnsubscribe();
  }

  onStateChange() {
  }

  formatTimeSinceStart(message: ClientMessage) {
    const start = this.client.connectedAtTime;
    const diff = message.time - start;
    return formatTime(diff);
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
