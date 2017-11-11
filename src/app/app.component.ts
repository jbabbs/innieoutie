import { Component, OnInit } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { DatabaseService } from './services/db/database.service';
import { CurrentProjectService } from './services/current-project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentProject

  constructor(
    public electronService: ElectronService,
    public currentProjectService: CurrentProjectService,
  ) {
    if (electronService.isElectron()) {
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('renderer', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  ngOnInit() {
    this.currentProject = this.currentProjectService.get();
    setInterval(() => {
      this.currentProject = this.currentProjectService.get();
      console.log(this.currentProject);
    }, 3000);
  }
}
