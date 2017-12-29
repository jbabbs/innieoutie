import { Component, Input, OnInit } from '@angular/core';
import { ClientMessage, messageType } from '../../redux/client/client-message.model';

@Component({
  selector: 'app-log-data',
  templateUrl: './log-data.component.html',
  styleUrls: ['./log-data.component.scss']
})
export class LogDataComponent implements OnInit {

  @Input() message: ClientMessage;

  constructor() { }

  ngOnInit() {

  }

  type(): string {
    return messageType(this.message.data);
  }

}
