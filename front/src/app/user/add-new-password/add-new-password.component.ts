import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-add-new-password',
  templateUrl: './add-new-password.component.html',
  styleUrls: ['./add-new-password.component.css']
})
export class AddNewPasswordComponent implements OnInit {
passwordFormats:any[];
searchText;
isLoadingDone:boolean=false;
  constructor(private cs:CommonService) { }

  ngOnInit() {
    this.cs.httpGet('/api/passwordFormats').subscribe(data=>{
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
        this.passwordFormats=data.response["list"];
        this.isLoadingDone=true;
      }

    })
  }
  create(item)
  {
    this.cs.sendData({for:"INFO",by:"ADD",format:item});
  }

}
