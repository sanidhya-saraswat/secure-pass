import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../common/common.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatBottomSheet } from '@angular/material';
import { BottomsheetComponent } from '../bottomsheet/bottomsheet.component';

@Component({
  selector: 'app-view-passwords',
  templateUrl: './view-passwords.component.html',
  styleUrls: ['./view-passwords.component.css']
})
export class ViewPasswordsComponent implements OnInit {
isLoadingDone:boolean=false;
lister;
searchText;
viewMode:string="list";
sortByField:string="lastModifiedOn";
order:number=-1;
  constructor(private bottomSheet: MatBottomSheet,private cs:CommonService) { }

  ngOnInit() {
    this.getPasswords();
 this.cs.getData().subscribe(data=>{
   if(data["for"]=="VIEW")
   {
     this.getPasswords();
   }
 })
  }
  getPasswords()
  {
    this.cs.httpGet('/api/passwords').subscribe(data=>{
      this.isLoadingDone=true;
      if(data.errorFlag)
      {
        if(data.errors[0]==10)
        {
          //email not verified
          this.cs.sendData({for:"BASE",isEmailVerified:false});
        }
      }
      else
      {
this.lister=data.response["list"] as Array<any>;

      }
    })
  }
itemClicked(item)
{
  this.cs.sendData({for:"INFO",by:"VIEW",item:item});
}
openBottomSheet()
{   var ref=this.bottomSheet.open(BottomsheetComponent,{data:{
  sortByField:this.sortByField,
  order:this.order
}});
ref.afterDismissed().subscribe(data=>{
  this.sortByField=data["sortByField"];
  this.order=parseInt(data["order"]);
});

}
}
