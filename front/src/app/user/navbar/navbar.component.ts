import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public dialog: MatDialog,private cs:CommonService) { }

  ngOnInit() {
  }

 logout() {
  this.cs.httpGet('/api/logout').subscribe(data => {
    if(data.errorFlag)
    {
      //not possible
    }
    else
    {
      this.cs.goTo('/home');
    }
  });
}
leftnavToggle()
{
  this.cs.leftnav.toggle();
}
logoClick()
{
  this.cs.goTo('')
}
}
