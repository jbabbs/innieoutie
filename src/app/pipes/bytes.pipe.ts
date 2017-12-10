import { Pipe, PipeTransform } from '@angular/core';
import { isNumber } from 'util';

@Pipe({
  name: 'bytes'
})
export class BytesPipe implements PipeTransform {

  bytesToSize(bytes: number, decimals: number = 0) {
    if (bytes === 0) {
      return '0';
    }
    const k = 1024,
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  }

  transform(value: any, args?: any): any {
    if (!isNumber(value)) {
      return '';
    }
    return this.bytesToSize(value);
  }

}
