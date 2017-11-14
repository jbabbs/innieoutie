import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-pane',
  templateUrl: './client-pane.component.html',
  styleUrls: ['./client-pane.component.scss']
})
export class ClientPaneComponent implements OnInit {
  clients: Array<any> = [
    { tabTitle: 'Client1' },
    { tabTitle: 'Client2' }
  ]

  constructor() { }

  ngOnInit() {
  }

}
