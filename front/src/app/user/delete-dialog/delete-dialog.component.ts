import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
_id;
  constructor(private cs:CommonService,public dialogRef: MatDialogRef<DeleteDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
      this._id=data._id;
    }

  ngOnInit() {
  }
yes()
{
this.cs.httpDelete('/api/password/'+this._id).subscribe(data=>{
if(data.errorFlag)
{
  //np

}
else
{
  this.dialogRef.close({deleted:true});
}
})
}
no()
{
this.dialogRef.close({deleted:false});
}
}
