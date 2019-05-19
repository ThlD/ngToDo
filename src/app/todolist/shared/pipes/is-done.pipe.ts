import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'isDone'
})

export class IsDonePipe implements PipeTransform {
  transform(items: any[], value: string): any {
    if (items === undefined) {
      return [];
    }
    return items.filter(i => {
      return i.isDone === value;
    });
  }
}
