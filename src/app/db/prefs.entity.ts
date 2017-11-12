import db from '.';
import { IPrefs } from './prefs.interface';

export class PrefsEntity implements IPrefs {
  id: number;
  advancedMode: boolean;

  constructor(advancedMode: boolean) {
    this.advancedMode = advancedMode;
  }

  save() {
    return  db.prefs.put({advancedMode: this.advancedMode});
  }
}
