import { IProject } from './project.interface';
import db from '.';

export class ProjectEntity implements IProject {
  id: number;
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  async save() {
    const id = await db.projects.put({name: this.name });
    this.id = id;
    return id;
  }
}
