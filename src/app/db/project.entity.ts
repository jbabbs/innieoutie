import { IProject } from './project.interface';
import db from '.';
import { ConnectionEntity } from './connection.entity';

export class ProjectEntity implements IProject {
  id: number;
  name: string;
  //connections: Array<ConnectionEntity>;

  static async fetch(id: number): Promise<ProjectEntity> {
    const project: IProject = await db.projects.get(id);
    const projectEntity = new ProjectEntity(project);
    const connections = await db.connections.where('projectId').equals(projectEntity.id).toArray();
    projectEntity.connections = connections.map(c => new ConnectionEntity(c));
    return projectEntity;
  }

  static async fetchCurrent(): Promise<ProjectEntity> {
    const project: IProject = await db.projects.toCollection().first();
    const projectEntity: ProjectEntity = await ProjectEntity.fetch(project.id);
    return projectEntity;
  }

  constructor(project: IProject) {
    Object.assign(this, project);
  }

  async save(): Promise<ProjectEntity> {
    const id = await db.projects.put({name: this.name });
    this.id = id;
    return this;
  }

  async delete(): Promise<void> {
    return await db.transaction('rw', db.projects, db.connections, async () => {
      await db.connections.where('projectId').equals(this.id).delete();
      return db.projects.delete(this.id);
    });
  }

}
