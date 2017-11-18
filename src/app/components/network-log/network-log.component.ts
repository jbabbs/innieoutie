import { Component, Input, OnInit } from '@angular/core';
import { Client } from '../../redux/client/client.model';

@Component({
  selector: 'app-network-log',
  templateUrl: './network-log.component.html',
  styleUrls: ['./network-log.component.scss']
})
export class NetworkLogComponent implements OnInit {
  @Input() public client: Client;
  constructor() { }

  ngOnInit() {
  }

}
