import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebSocketService } from '../../services/web-socket.service';
import { DbService } from '../../services/db.service';
import { AppStore } from '../../redux/app.store';
import { Store } from 'redux';
import { AppState } from '../../redux/app.reducer';
import { NewProxyModalComponent } from '../../modals/new-proxy-modal/new-proxy-modal.component';
import { IProxy } from '../../db/proxy.interface';

@Component({
  selector: 'app-proxies-tab',
  templateUrl: './proxies-tab.component.html',
  styleUrls: ['./proxies-tab.component.scss']
})
export class ProxiesTabComponent implements OnInit, OnDestroy {

  public proxies: Array<any> = [];
  private storeUnsubscribe;

  constructor(
    private modalService: NgbModal,
    private dbService: DbService,
    private wsService: WebSocketService,
    @Inject(AppStore) private store: Store<AppState> | null
  ) {
  }

  ngOnInit() {
    this.storeUnsubscribe = this.store.subscribe(() => {
      this.onStateChange();
    });
    this.onStateChange();
  }

  ngOnDestroy() {
    this.storeUnsubscribe();
  }

  onNewProxyClick() {
    this.modalService.open(NewProxyModalComponent, {size: 'lg'}).result.then(
      proxy => {
        this.dbService.addProxyToCurrentProject(proxy);
      }
    ).catch(err => {  });
  }

  onEditProxyClick(oldProxy: IProxy) {
    const modalRef = this.modalService.open(NewProxyModalComponent, {size: 'lg'});
    modalRef.componentInstance.title = 'Edit Proxy';
    modalRef.componentInstance.initial = oldProxy;
    modalRef.result.then(
      newProxy => {
        // make sure to keep same id
        const mergedProxy = Object.assign({}, oldProxy, newProxy);
        this.dbService.updateProxy(mergedProxy);
      }
    ).catch(err => {  });
  }

  onListenClick(proxy) {
    this.wsService.proxyListen(proxy);
  }

  onDeleteProxyClick(proxy) {
    this.dbService.deleteProxy(proxy.id);
  }

  onStateChange() {
    // This is necessary because sometimes this tab was being rendered even if state.currentProject was null
    // This will prevent any exceptions from being thrown
    const state = this.store.getState();
    if (!state.currentProject) {
      this.proxies = [];
    } else {
      this.proxies = state.currentProject.proxies;
    }
  }

}
