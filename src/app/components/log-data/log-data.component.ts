import { Component, Input, OnInit } from '@angular/core';
import { ClientMessage, messageType } from '../../redux/client/client-message.model';
import { isString } from 'util';

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

  shouldShowCollapseIcon(message: ClientMessage) {
    if (!isString(message.data)) {
      return false;
    }
    const data = <string>message.data;
    return data && data.length && data.indexOf('\n') !== -1;
  }

  onCodeDoubleClick(message: any) {
    if (this.shouldShowCollapseIcon(message)) {
      message.beautify = !message.beautify;
    }
  }

}
