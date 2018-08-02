import { Pipe, PipeTransform } from '@angular/core';

export interface KeyValue {
  key: string;
  value: any;
}

/**
 * Returns an array of key values for dealing with enums
 */
@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  transform(eenum: object): KeyValue[] {
    return Object.keys(eenum)
      /**
       * We filter out first keys for computed enums as calling Object.keys on them return:
       * @example
       * enum ExEnum {
       *   One = 1
       * }
       * console.log(Object.keys(ExEnum)) // [1, 'One']
       */
      .filter((key, i, keys) => eenum[key] !== keys[i + Math.floor(keys.length / 2)])
      .map(key => ({
        key,
        value: eenum[key]
      }));
  }
}
