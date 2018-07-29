import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(item:string, searchText: string): string {
        if(!searchText) return item;
searchText = searchText.toLowerCase();
let startIndex = item.toLowerCase().indexOf(searchText.toLowerCase());
let matchingString=item.substr(startIndex,searchText.length);
if(startIndex==-1)
  {
    return item;
  }
  else
  {
    return item.replace(matchingString,"<span class='highlight'>"+matchingString+"</span>");
  }

   }
}