import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm;
showProgress:boolean=false;
  errors: string[]=[];
  constructor(private cs:CommonService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe:new FormControl('')
     }); 
  }
  onFormSubmit()
  {
    this.showProgress=true;
    this.cs.httpPost('/api/loginLocal',this.loginForm.value).subscribe(data=>{
      this.showProgress=false;
    if(data.errorFlag)
    {
      this.errors=[];
      data.errors.forEach(x=>{
        this.errors.push(this.cs.errors.get(x));
      })
      window.scroll({ top: 0, behavior: 'smooth' })
    }
    else
    {
      this.cs.goTo('/dashboard');
    }
    });
  }
  loginGoogle()
  {
    this.showProgress=true;
    window.open(this.cs.testingURL+"/api/loginGoogle","_self")
  }
  signUp()
  {
    this.cs.goTo('/signUp');
  }
  
}
