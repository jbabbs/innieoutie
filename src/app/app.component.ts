import { Component, OnInit } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public electronService: ElectronService,
    public db: DatabaseService,
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

  async ngOnInit() {
    const db2 = await this.db.get();
    const doc = db2.projects.newDocument({
      name: 'thisisanindex2'
    });
    doc.save().then(() => {
      db2.projects.find().$.subscribe(all => {
        console.log(all);
      });
    });
  }
}
