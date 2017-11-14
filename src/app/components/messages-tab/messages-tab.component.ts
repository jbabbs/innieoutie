import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages-tab',
  templateUrl: './messages-tab.component.html',
  styleUrls: ['./messages-tab.component.scss']
})
export class MessagesTabComponent implements OnInit {
  public messageItems: Array<any> = [  ]

  constructor() {
    this.messageItems = (new Array(30)).map(() => ({name: 'message'}));
  }

  ngOnInit() {
  }

  onNewClick() {

  }
}
