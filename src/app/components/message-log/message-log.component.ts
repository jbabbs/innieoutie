import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Client } from '../../redux/client/client.model';
import { AppStore } from '../../redux/app.store';
import { AppState } from '../../redux/app.reducer';
import { Store } from 'redux';
import { ClientEvent, ClientMessage, ClientMessageDirection } from '../../redux/client/client-message.model';
import { formatTime } from '../../utils/time';
import { WebSocketService } from '../../services/web-socket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewMessageModalComponent } from '../../modals/new-message-modal/new-message-modal.component';
import { DbService } from '../../services/db.service';
import { Message } from '../../redux/message/message.model';

@Component({
  selector: 'app-message-log',
  templateUrl: './message-log.component.html',
  styleUrls: ['./message-log.component.scss']
})
export class MessageLogComponent implements OnInit, OnDestroy {
  @Input() public client: Client;
  private storeUnsubscribe: any;

  constructor(
    @Inject(AppStore) private store: Store<AppState> | null,
    private wsService: WebSocketService,
    private dbService: DbService,
    private modalService: NgbModal,
  ) {
    this.storeUnsubscribe = this.store.subscribe(() => this.onStateChange());
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.storeUnsubscribe();
  }

  onStateChange() {
  }

  formatTimeSinceStart(message: ClientMessage) {
    if (!this.client.connectedAtTime) {
      // client may not connect but we can still receive error messages
      return '';
    }
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

  onSaveMessageClick(message: ClientMessage) {
    const modalRef = this.modalService.open(NewMessageModalComponent, {size: 'lg'});
    modalRef.componentInstance.formValue = { string: message.data, type: 'string' };
    modalRef.result.then(
      (messageOut: Message) => {
          this.dbService.addMessageToCurrentProject(<any>messageOut);
      }
    ).catch(
      err => {

      }
    );

  }

  onResendMessageClick(message: ClientMessage) {
    this.wsService.sendMessage(message.data, this.client);
  }

  bgColor(message) {
    if (message.type() === 'error') {
      return 'rgba(220, 53, 69, 0.32)';
    } else {
      if (message.direction === ClientMessageDirection.RECEIVED) {
        return 'rgba(255, 193, 7, 0.26)';
      } else if (message.direction === ClientMessageDirection.SENT) {
        return 'rgba(40, 167, 69, 0.32)';
      }
    }
  }
}
