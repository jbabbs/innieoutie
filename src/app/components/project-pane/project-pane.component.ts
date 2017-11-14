import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-project-pane',
  templateUrl: './project-pane.component.html',
  styleUrls: ['./project-pane.component.scss']
})
export class ProjectPaneComponent implements OnInit {
  selectedTab: TemplateRef<any>;

  constructor() {

  }

  ngOnInit() {
  }

  setSelectedTab(ref) {
    this.selectedTab = ref;
  }

}
