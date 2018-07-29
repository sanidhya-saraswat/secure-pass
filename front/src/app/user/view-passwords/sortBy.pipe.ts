import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(items: any[], field: string,order:number): any[] {
    if(!items) return [];
    return items.sort((a,b)=>{
        if(field=='createdOn' || field=='lastModifiedOn')
        {   
            return (new Date(a[field])).getTime() > (new Date(b[field])).getTime() ? order : order * (- 1);
        }
        else
        {
            return a[field] > b[field] ? order : order * (- 1);
        }
    })
/* searchText = searchText.toLowerCase();
return items.filter(obj=>{
  return obj.username.toLowerCase().includes(searchText) || obj.type.toLowerCase().includes(searchText) || obj.title.toLowerCase().includes(searchText)
}) */
/* return items.filter( it => {
      return it.type.toLowerCase().includes(searchText);
    }); */
    
   }
}