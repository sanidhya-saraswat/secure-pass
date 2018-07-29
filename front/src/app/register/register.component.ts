import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../common/common.service';
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm;
  showProgress: boolean = false;
  captchaText: string = "";
  captchaSuccess: boolean = false;
  errors: string[] = [];
  loading: boolean = false;
  signUpText: string = "Sign Up";
  pageLoadingDone:boolean=false;
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  constructor(private cs: CommonService) { }

  ngOnInit() {
        this.registerForm = new FormGroup({
          name:new FormControl(''),
          email: new FormControl('', [Validators.required,Validators.email]),
          password: new FormControl('',[Validators.required,Validators.pattern('.{6,}')]),
          confirmPassword: new FormControl('',[Validators.required])
         },this.passwordMatchValidator); 
/*     this.registerForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''), 
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    }); */
  }
  passwordMatchValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({ 'notMatch': true });
      return { 'notMatch': true };
    }
    return null;
  }
  onFormSubmit() {
    this.errors = [];
    if (this.captchaText == "") {
      this.errors.push("Invalid captcha");
    }
    else {
      /* this.captchaElem.reloadCaptcha(); */
      var obj = this.registerForm.value;
      obj["captchaText"] = this.captchaText;
      this.loading = true;
      this.signUpText = "Please wait...";
      this.showProgress = true;
      this.cs.httpPost('/api/register', obj).subscribe(data => {
        this.signUpText = "Sign Up";
        this.showProgress = false;
        this.captchaSuccess = false;
        this.loading = false;
        if (data.errorFlag == true) {
          data.errors.forEach(x=>{
            this.errors.push(this.cs.errors.get(x));
          })
          window.scroll({ top: 0, behavior: 'smooth' })
          this.captchaElem.reloadCaptcha();
        }
        else 
        {
          this.cs.goTo('/dashboard');
        }
      })
    }
  }
  handleSuccess(val): void {
    this.captchaSuccess = true;
    this.captchaText = val;
  }
  handleExpire() {
  }
  registerGoogle() {
    this.showProgress=true;
    window.open(this.cs.testingURL+"/api/loginGoogle", "_self")
  }
  handleLoad()
  {
    setTimeout(()=>{
      this.pageLoadingDone=true;
    },300)
   
  }
}
