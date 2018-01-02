import { Pipe, PipeTransform } from '@angular/core';
import * as beautify from 'json-beautify';
import { isString } from 'util';

@Pipe({
  name: 'beautifyJson'
})
export class BeautifyJsonPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!isString(value)) {
      return value;
    }
    let obj
    try {
      obj = JSON.parse(value);
      return beautify(obj, null, 2, 100);
    } catch (e) {
      console.warn('Beautify failed:', e);
      return value;
    }

  }

}
