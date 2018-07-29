import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common/common.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor(private cs:CommonService) { }

  ngOnInit() {
  }
signIn()
{
  this.cs.goTo('signIn')
}
signUp()
{
  this.cs.goTo('signUp')
}
}
