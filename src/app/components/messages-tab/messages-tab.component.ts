import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DbService } from '../../services/db.service';
import { WebSocketService } from '../../services/web-socket.service';
import { Store } from 'redux';
import { AppState } from '../../redux/app.reducer';
import { AppStore } from '../../redux/app.store';
import { Message } from '../../redux/message/message.model';
import { Client } from '../../redux/client/client.model';
import { NewMessageModalComponent } from '../../modals/new-message-modal/new-message-modal.component';

@Component({
  selector: 'app-messages-tab',
  templateUrl: './messages-tab.component.html',
  styleUrls: ['./messages-tab.component.scss']
})
export class MessagesTabComponent implements OnInit, OnDestroy {
  public messages: Array<Message> = [];
  private storeUnsubscribe;

  constructor(
    private modalService: NgbModal,
    private dbService: DbService,
    private wsService: WebSocketService,
    @Inject(AppStore) private store: Store<AppState> | null
  ) {
  }

  ngOnInit() {
    this.storeUnsubscribe = this.store.subscribe(() => {
      this.onStateChange();
    });
    this.onStateChange();
  }

  ngOnDestroy() {
    this.storeUnsubscribe();
  }

  onStateChange() {
    const state = this.store.getState();
    if (!state.currentProject) {
      this.messages = [];
    } else {
      this.messages = state.currentProject.messages;
    }
  }

  onEditMessageClick(oldMessage: Message) {
    const modalRef = this.modalService.open(NewMessageModalComponent, {size: 'lg'});
    modalRef.componentInstance.title = 'Edit Message';
    modalRef.componentInstance.initial = oldMessage;
    modalRef.result.then(
      newMessage => {
        // make sure to keep same id
        const msg = Object.assign({}, oldMessage, newMessage);
        this.dbService.updateMessage(msg);
      }
    ).catch(err => {  });
  }

  onNewClick() {
    const modalRef = this.modalService.open(NewMessageModalComponent, {size: 'lg'});
    modalRef.result.then(
      async (messageOut: Message) => {
        await this.dbService.addMessageToCurrentProject(<any>messageOut);
      }
    ).catch(
      err => {

      }
    );
  }

  onDeleteMessageClick(message: Message) {
    this.dbService.deleteMessage(message.id);
  }

  onSendMessageClick(message: Message) {
    const state = this.store.getState();

    if (!state.currentProject || !state.currentProject.clients.length) {
      return;
    }
    const idx: number = state.activeClientTabIdx;
    const client: Client = state.currentProject.clients[idx];
    this.wsService.sendMessage(message.data, client);
  }
}
