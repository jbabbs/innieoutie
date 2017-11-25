import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DbService } from '../../services/db.service';
import { WebSocketService } from '../../services/web-socket.service';
import { Store } from 'redux';
import { AppState } from '../../redux/app.reducer';
import { AppStore } from '../../redux/app.store';
import { Message } from '../../redux/message/message.model';
import { Client } from '../../redux/client/client.model';

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

  onNewClick() {

  }

  onDeleteMessageClick(message: Message) {

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
