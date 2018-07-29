import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {

  constructor(private cs: CommonService, private router: Router) {
    this.cs.httpGet('/api/isLoggedIn').subscribe(data => {
      if (data.errorFlag) {
        //np
      }
      else {
        if (data.response["isLoggedIn"]) {
          this.router.navigate(['/dashboard'])
        }
        else {
          this.router.navigate(['/home']);
        }
      }
    })
   }

  ngOnInit() {

  }

}
