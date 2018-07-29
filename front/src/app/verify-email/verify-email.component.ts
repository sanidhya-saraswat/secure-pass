import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../common/common.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private route: ActivatedRoute,private cs:CommonService) { }
result;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.result = params['result']; 
   });
  
  }
  signIn()
  {
    this.cs.goTo('/signIn');
  }

}
