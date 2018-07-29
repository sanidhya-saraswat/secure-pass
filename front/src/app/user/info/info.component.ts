import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../common/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  showDefault: boolean = true;
  data;
  url;
  urlDisabled: boolean = false;
  type;
  image;
  formGroup: any;
  readonly:boolean=false;
  showMode:string="ADD";
  editBtnText:string="Edit";
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  constructor(private media: MediaMatcher, private changeDetectorRef: ChangeDetectorRef,private cs: CommonService,public snackBar: MatSnackBar,private router:Router,public dialog: MatDialog) { }

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 700px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.router.events.subscribe((val) => {
      // see also 
     
      if(val instanceof NavigationEnd) 
      {
this.showDefault=true;
this.readonly=false;
this.editBtnText="Edit"
      }
  });
    this.cs.getData().subscribe(data => {
      if (data["for"] == "INFO" && data["by"]=="ADD") {
        this.showMode="ADD"
        this.url = data.format.url;
        this.type = data.format.type;
        this.image = data.format.image;
        if (this.type == "Default") this.urlDisabled = false;
        else this.urlDisabled = true;
        this.formGroup = new FormGroup({
          url: new FormControl(this.url),
          image: new FormControl(this.image),
          type: new FormControl(this.type),
          title: new FormControl(''),
          username: new FormControl('', Validators.required),
          password: new FormControl('', Validators.required)
        });
        this.showDefault = false;
        this.cs.rightnav.open();
      }
      else if(data["for"] == "INFO" && data["by"]=="VIEW")
      {
        this.readonly=true;
        this.showMode="VIEW";
        this.url = data.item.url;
        this.type = data.item.type;
        this.image = data.item.image;
        if (this.type == "Default") this.urlDisabled = false;
        else this.urlDisabled = true;
        this.formGroup = new FormGroup({
          url: new FormControl(this.url),
          image: new FormControl(this.image),
          type: new FormControl(this.type),
          title: new FormControl(data.item.title),
          username: new FormControl(data.item.username, Validators.required),
          password: new FormControl(data.item.password, Validators.required),
          _id:new FormControl(data.item._id)
        });
        this.showDefault = false;
        this.cs.rightnav.open();
      }
    })
  }
  clear() {
    this.formGroup.reset({ url: this.url });
  }
  onFormSubmit()
  {
   if(this.showMode=='ADD')
   {
    this.cs.httpPost('/api/password',this.formGroup.value).subscribe(data=>{
      if(data.errorFlag)
      {
        //np
      }
      else
      {
        this.cs.goTo('')
        this.snackBar.open("Successfully Added!");
        //if mobile
        //this.cs.rightnav.close();
        
      }})
   }
else
{
 //edit 
if(this.editBtnText=="Edit")
{
  this.editBtnText="Save";
  this.readonly=false;
}
else
{
  this.snackBar.open("This functionality is having some issue. Working on that.");
   /*  this.cs.httpPut('/api/password',this.formGroup.value).subscribe(data=>{

    }) */
}
}


  }
delete()
{
 var ref=this.dialog.open(DeleteDialogComponent, {
    data: {_id:this.formGroup.get('_id').value}
  });
  ref.afterClosed().subscribe(result => {
    if(result["deleted"])
    {
      this.snackBar.open("Deleted Successfully!");
      this.showDefault=true;
      this.cs.sendData({for:"VIEW"});
      //if mobile close right nav
      console.log(this.mobileQuery.matches);
      if(this.mobileQuery.matches)
      this.cs.rightnav.close();
    }
  });
}
close()
{
  this.cs.rightnav.close();
}
}
