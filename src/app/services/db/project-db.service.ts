import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { RxDocument } from 'rxdb';

@Injectable()
export class ProjectDBService {

  constructor(private dbService: DatabaseService) { }

  async create(name: string) {
    const db = await this.dbService.get();
    const doc = db.projects.insert({
      name: name
    });
    return  doc;
  }

  async delete(project) {
    return await project.remove();
  }
}
