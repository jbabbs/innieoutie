import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Client } from '../../redux/client/client.model';
import { AppStore } from '../../redux/app.store';
import { AppState } from '../../redux/app.reducer';
import { Store } from 'redux';
import { ClientMessage, ClientMessageDirection } from '../../redux/client/client-message.model';
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

  fileContents(data: any) {
    if (!data) {
      return '';
    }
    if (data.name) {
      return data.name;
    }
    if (data.size) {
      return `Blob Data`;
    }
  }

}
