import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../../redux/client/client.model';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
  selector: 'app-quick-send-bar',
  templateUrl: './quick-send-bar.component.html',
  styleUrls: ['./quick-send-bar.component.scss']
})
export class QuickSendBarComponent implements OnInit {
  @Input() client: Client;
  @Input() message: string;

  constructor(private wsService: WebSocketService) { }

  ngOnInit() {
  }

  onSendClick() {
    this.wsService.sendMessage(this.message, this.client);
  }
}
