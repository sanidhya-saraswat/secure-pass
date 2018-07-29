import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(item:any): any {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];
var d=new Date(item);
var now=new Date()
var nowStr=now.getDate()+" "+monthNames[now.getMonth()]+" "+now.getFullYear();
var dStr=d.getDate()+" "+monthNames[d.getMonth()]+" "+d.getFullYear();
if(nowStr==dStr)
{
    return "Today "+this.getTime(d);
}
return dStr+" "+this.getTime(d);
   }
   getTime(d)
   {
       var ampm;
       var hours:Number;
       if(d.getHours()<12)
       {
           ampm="am"
           hours=d.getHours();
       }
       else if(d.getHours()==12)
       {
           ampm="pm"
           hours=d.getHours();
       }
       else
       {
           ampm="pm";
           hours=d.getHours()-12;
       }
     return hours+":"+d.getMinutes()+" "+ampm;
   }
}