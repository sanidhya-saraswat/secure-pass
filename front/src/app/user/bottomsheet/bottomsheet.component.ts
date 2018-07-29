import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-bottomsheet',
  templateUrl: './bottomsheet.component.html',
  styleUrls: ['./bottomsheet.component.css']
})
export class BottomsheetComponent implements OnInit {
  sortByField:string;
  order:number;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private bottomSheetRef: MatBottomSheetRef<BottomsheetComponent>) { }

  ngOnInit() {
    this.sortByField=this.data["sortByField"];
    this.order=parseInt(this.data["order"]);
  }
apply()
{
  this.bottomSheetRef.dismiss({sortByField:this.sortByField,order:this.order});
}
}
