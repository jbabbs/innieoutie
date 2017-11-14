import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { AppStore } from './redux/app.store';
import { AppState } from './redux/app.reducer';
import { Store } from 'redux';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public projectLoaded: boolean;
  private storeSubscription: any;

  constructor(
    public electronService: ElectronService,
    @Inject(AppStore) private store: Store<AppState> | null,
  ) {
    if (electronService.isElectron()) {
      // Check if renderer and electron service is correctly injected (see externals in webpack.config.js)
      console.log('renderer', electronService.ipcRenderer, 'childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  ngOnInit() {
    this.storeSubscription = this.store.subscribe(() => {
      this.updateState()
    });
  }

  ngOnDestroy() {
    this.storeSubscription();
  }

  updateState() {
    const state = this.store.getState();
    this.projectLoaded = !!state.currentProject;
  }
}
