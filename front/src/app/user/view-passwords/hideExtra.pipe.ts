import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'hideExtra'
})
export class HideExtraPipe implements PipeTransform {
  transform(item:string): string {
if(item.length>8)
{
    return item.substring(0,6)+"...";
}
return item;
   }
}