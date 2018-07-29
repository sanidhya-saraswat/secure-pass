import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { MatSidenav, MatSnackBar } from '@angular/material';
import { CommonService } from '../../common/common.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  @ViewChild(MatSidenav)
  @ViewChild('leftnav') leftnav: MatSidenav;
  @ViewChild('rightnav') rightnav:MatSidenav;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  mobileQuery: MediaQueryList;
  mobileQuery2: MediaQueryList;
  isLoggedIn: boolean = false;
  showEmailVerifyMessage: boolean = false;
  private mobileQueryListener: () => void;
  selectedLink;
  showSuccessMessage: boolean = false;
  showFailureMessage: boolean = false;
  message: any;
  showProgress: boolean = false;
  name: String = "";
  pageTitle: string;
  url;
  constructor(public snackBar: MatSnackBar, private cs: CommonService, private media: MediaMatcher, private changeDetectorRef: ChangeDetectorRef,private router:Router) { }
  ngOnInit() {
/*     const hammertime2 = new Hammer((this.rightnav._elementRef.nativeElement, {});
    hammertime2.on('panright', (ev) => {
        this.rightnav.close();
    });  */
    console.log(this.rightnav);
    this.cs.httpGet('/api/getBasicInfo').subscribe(data => {
      this.name = data.response["name"];
    })
    this.mobileQuery = this.media.matchMedia('(min-width: 900px)');
    this.mobileQuery2 = this.media.matchMedia('(min-width: 700px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.mobileQuery2.addListener(this.mobileQueryListener);
    this.cs.leftnav = this.leftnav;
    this.cs.rightnav=this.rightnav;
    this.router.events.subscribe((val) => {
      // see also 
      if(val instanceof NavigationEnd) 
      {
        this.url=val.urlAfterRedirects;
        this.routeChanged();
      }
  });

   this.url = window.location.href;
   this.routeChanged();
    this.cs.getData().subscribe(data => {
      if(data["for"]=="BASE")
      {
      if (data["isEmailVerified"] == false) {
        this.showEmailVerifyMessage = true;
      }
      else {
        //do something else
        this.showMessage(data["isSuccess"], data["message"]);
      }
    }
    })
  

  }
  routeChanged()
  {
    if (this.url.includes("addNewPassword")) {
      this.selectedLink = 'anp';
      this.pageTitle = "Add New Password";
    }
    else if (this.url.includes("viewAllPasswords")) {
      this.selectedLink = 'vap';
      this.pageTitle = "View All Passwords";
    }
    else if (this.url.includes("addNewNote")) {
      this.selectedLink = 'ann';
    }
  }
  changeRoute(str) {
    if(!this.mobileQuery.matches)
    {
      this.leftnav.toggle();
    }
    this.selectedLink = str;
    switch (str) {
      case 'vap': {
        this.cs.goTo('/dashboard');
        break;
      }
      case 'anp': {
        this.cs.goTo('/dashboard/addNewPassword')
        break;
      }
      case 'ann': {
        this.snackBar.open("This feature is currently under development");
        break;
      }
      case 'van': {
        this.snackBar.open("This feature is currently under development");
        break;
      }
      default: console.log("error");
    }
  }
  resendMail() {
    this.showProgress = true;
    this.cs.httpGet('/api/verifyResend').subscribe(data => {
      this.showProgress = false;
      this.showEmailVerifyMessage = false;
      if (data.errorFlag) {
        this.showMessage(false, this.cs.errors.get(data.errors[0]));
      }
      else {
        this.showMessage(true, "Verification mail sent.");
      }
    });
  }
  hideMessageDiv() {
    this.showSuccessMessage = false;
    this.showFailureMessage = false;
  }
  showMessage(isSuccess, message) {
    this.message = message;
    if (isSuccess) {
      this.showSuccessMessage = true;
      this.showFailureMessage = false;
    }
    else {
      this.showFailureMessage = true;
      this.showSuccessMessage = false;
    }
  }
  onSwipeRight(ev)
  {
    if(!this.mobileQuery2.matches)
    {
      this.rightnav.close();
    }
  }
  onSwipeRightContent(ev)
  {
    if(!this.mobileQuery.matches)
    {
      this.leftnav.open();
    }
  }
  onSwipeLeftContent(ev)
  {
    if(!this.mobileQuery.matches)
    {
      this.leftnav.close();
    }
  }
}
