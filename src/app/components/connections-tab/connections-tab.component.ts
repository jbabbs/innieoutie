import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connections-tab',
  templateUrl: './connections-tab.component.html',
  styleUrls: ['./connections-tab.component.scss']
})
export class ConnectionsTabComponent implements OnInit {
  public connections: Array<any> = [];

  constructor() {
    this.connections = (new Array(30)).map(() => ({name: 'connection'}));
  }

  ngOnInit() {
  }

  onNewClick() {

  }
}
