import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { AppStore } from '../../redux/app.store';
import { Store } from 'redux';
import { AppState } from '../../redux/app.reducer';
import { Project } from '../../redux/project/project.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public currentProject: Project;
  private storeSubscription: any;

  constructor(
    private db: DbService,
    private cd: ChangeDetectorRef,
    @Inject(AppStore) private store: Store<AppState>) { }

  ngOnInit() {
    this.storeSubscription = this.store.subscribe(() => {
      this.onStateChange();
    })
    this.onStateChange();
  }

  ngOnDestroy() {
    this.storeSubscription();
  }

  onStateChange() {
    const state = this.store.getState();
    this.currentProject = state.currentProject;
    this.cd.detectChanges();
  }

  onDeleteClick() {
    const state = this.store.getState();
    this.db.deleteProject(state.currentProject.id);
  }
}
