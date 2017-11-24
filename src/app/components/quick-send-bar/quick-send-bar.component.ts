import { Component, Inject, Input, OnInit } from '@angular/core';
import { Client } from '../../redux/client/client.model';
import { WebSocketService } from '../../services/web-socket.service';
import { AppStore } from '../../redux/app.store';
import { Store } from 'redux';
import { AppState } from '../../redux/app.reducer';

@Component({
  selector: 'app-quick-send-bar',
  templateUrl: './quick-send-bar.component.html',
  styleUrls: ['./quick-send-bar.component.scss']
})
export class QuickSendBarComponent implements OnInit {
  @Input() client: Client;
  @Input() message: string;

  constructor(
    private wsService: WebSocketService,
    @Inject(AppStore) store: Store<AppState> | null
  ) { }

  ngOnInit() {
  }

  onSendClick($event) {
    this.wsService.sendMessage(this.message, this.client);
    $event.preventDefault();
  }

  isSendDisabled() {
    let connected = false;
    if (this.client.webSocket$.socket && this.client.webSocket$.socket.readyState === WebSocket.OPEN) {
      connected = true;
    }
    return !this.message || !connected;
  }
}
