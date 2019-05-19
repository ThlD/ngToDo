import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterByPrio'
})

export class FilterByPrioPipe implements PipeTransform {
  transform(items: any[], value: string): any {
    if (value === null) {
      return items;
    }
    return items.filter(i => {
      return i.priority === value;
    });
  }
}
