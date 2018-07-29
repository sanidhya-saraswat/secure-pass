import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter2'
})
export class Filter2Pipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter(obj=>{
  return obj.username.toLowerCase().includes(searchText) || obj.type.toLowerCase().includes(searchText);
})
/* return items.filter( it => {
      return it.type.toLowerCase().includes(searchText);
    }); */
    
   }
}