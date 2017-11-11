import { Injectable } from '@angular/core';

@Injectable()
export class CurrentProjectService {
  project: any;

  constructor() { }

  set(project) {
    console.log('set', project);
    this.project = project;
  }

  get() {
    return this.project;
  }

  loadMostRecent() {

  }
}
