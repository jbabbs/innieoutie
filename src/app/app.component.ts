import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { AppStore } from './redux/app.store';
import { AppState } from './redux/app.reducer';
import { Store } from 'redux';
import { NewProjectModalComponent } from './modals/new-project-modal/new-project-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DbService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public projectLoaded = true;
  private storeUnsubscribe: any;

  constructor(
    private electronService: ElectronService,
    private modalService: NgbModal,
    private dbService: DbService,
    @Inject(AppStore) private store: Store<AppState> | null,
  ) {
    if (electronService.isElectron()) {
      // Check if renderer and electron service is correctly injected (see externals in webpack.config.js)
      console.log('renderer', electronService.ipcRenderer, 'childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }

    // app subscribes
    this.storeUnsubscribe = this.store.subscribe(() => {
      this.onStateChange()
    });
  }

  ngOnInit() {
    this.onStateChange()
  }

  ngOnDestroy() {
    this.storeUnsubscribe();
  }

  onStateChange() {
    const state = this.store.getState();
    this.projectLoaded = !!state.currentProject;
  }

  onNewProjectClick() {
    const modalRef = this.modalService.open(NewProjectModalComponent);
    modalRef.result.then(projectName => {
      this.dbService.createProjectAndSetCurrent({ name: projectName, servers: [], messages: []});
    }).catch(err => {
      // modal dismissed
    });
  }
}
