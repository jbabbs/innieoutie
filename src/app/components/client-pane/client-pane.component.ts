import { Component, Inject, OnInit } from '@angular/core';
import { AppStore } from '../../redux/app.store';
import { Store } from 'redux';
import { AppState } from '../../redux/app.reducer';

@Component({
  selector: 'app-client-pane',
  templateUrl: './client-pane.component.html',
  styleUrls: ['./client-pane.component.scss']
})
export class ClientPaneComponent implements OnInit {
  public clients: Array<any> = [];
  private storeUnsubscribe;

  constructor(@Inject(AppStore) private store: Store<AppState> | null) {
    this.storeUnsubscribe = store.subscribe(() => this.onStateChange());
  }

  ngOnInit() {
  }

  onStateChange() {
    const state = this.store.getState();
    if (state.currentProject) {
      this.clients = state.currentProject.clients;
    } else {
      this.clients = [];
    }
  }
}
