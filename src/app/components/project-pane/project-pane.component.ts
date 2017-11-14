import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { AppState } from '../../redux/app.reducer';
import { Store } from 'redux';
import { AppStore } from '../../redux/app.store';
import { Project } from '../../redux/project/project.model';

@Component({
  selector: 'app-project-pane',
  templateUrl: './project-pane.component.html',
  styleUrls: ['./project-pane.component.scss']
})
export class ProjectPaneComponent implements OnInit, OnDestroy {
  public currentProject: Project;
  public storeSubscription: any;

  constructor(
    private dbService: DbService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(AppStore) private store: Store<AppState> | null,
  ) {
    this.storeSubscription = this.store.subscribe(() => {
      this.onStateChange()
    });
  }

  ngOnInit() {
    this.onStateChange();
  }

  ngOnDestroy() {
    this.storeSubscription();
  }

  onDeleteProjectClick() {
    const state = this.store.getState();
    this.dbService.deleteProject(state.currentProject.id);
  }

  onStateChange() {
    const state = this.store.getState();
    this.currentProject = state.currentProject;
    this.changeDetectorRef.detectChanges();
  }

}
