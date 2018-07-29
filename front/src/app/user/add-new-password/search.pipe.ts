import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.type.toLowerCase().includes(searchText);
    });
    
   }
}