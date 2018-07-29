import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private cs:CommonService) { }

  ngOnInit() {
  }
  signIn()
  {
    this.cs.goTo('/signIn');
  }
  signUp()
 {
this.cs.goTo('/signUp');
 }
 logoClick()
 {
  this.cs.goTo('');
 }
}
