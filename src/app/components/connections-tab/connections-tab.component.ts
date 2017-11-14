import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewConnectionModalComponent } from '../../modals/new-connection-modal/new-connection-modal.component';

@Component({
  selector: 'app-connections-tab',
  templateUrl: './connections-tab.component.html',
  styleUrls: ['./connections-tab.component.scss']
})
export class ConnectionsTabComponent implements OnInit {
  public connections: Array<any> = [];

  constructor(private modalService: NgbModal) {
    //this.connections = (new Array(30)).map(() => ({name: 'connection'}));
  }

  ngOnInit() {
  }

  onNewConnectionClick() {
    this.modalService.open(NewConnectionModalComponent, {size: 'lg'}).result.then(
      connection => {
        console.log(connection);
      }).catch(err => {

    });
  }
}
