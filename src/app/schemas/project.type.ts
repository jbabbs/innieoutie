/**
 * custom typings so typescript knows about the schema-fields
 * @type {[type]}
 */

import { RxCollection, RxDatabase } from 'rxdb';

declare interface RxProjectType {
  name?: string;

  // ORM methods
  getName(): number;
}

declare class RxProjectCollection extends RxCollection<RxProjectType> {
}

export class RxProjectDatabase extends RxDatabase {
  projects?: RxProjectCollection;
}

declare let _default: {
  RxProjectCollection,
  RxProjectDatabase,
  RxProjectType,
};
export default _default;
