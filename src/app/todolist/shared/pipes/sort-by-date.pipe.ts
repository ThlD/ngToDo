import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sortByDate'
})

export class SortByDatePipe implements PipeTransform {
  transform(items: any[], field: string, direction: boolean): any {
    if (items.length === 0) {
      return items;
    }
    if (direction === true) {
      return items.sort((a, b) => {
        return b[field].toDate() - a[field].toDate();
      });
    }
    if (direction === false) {
      return items.sort((a, b) => {
        return a[field].toDate() - b[field].toDate();
      });
    }
  }
}
