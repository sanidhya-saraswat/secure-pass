import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
export class Error{
  code:number;
  message:string;
}
export interface GlobalResponse
{
errorFlag:boolean;
errors:number[];
response:object;
}
@Injectable()
export class CommonService {
  testingURL:string=environment.testingURL;
/* testingURL:string="http://localhost:3000" */
  email:string="";
  debug:boolean=true;
  options={};
  errors:Map<number,string>;
  isLoggedIn:boolean=false;
  observeLoggedIn;
  leftnav;
  rightnav;
  subject = new Subject<any>();
  constructor(private http: HttpClient,private router:Router) {
    this.observeLoggedIn= new BehaviorSubject<Boolean>(this.isLoggedIn);
    this.errors=new Map();
    this.errors.set(1,"Not logged in or session expired");
    this.errors.set(2,"Something went wrong.");
    this.errors.set(3,"Captcha error");
    this.errors.set(4,"Account already exists");
    this.errors.set(5,"Email verification failure");
    this.errors.set(6,"Incorrect email or password");
    this.errors.set(7,"Invalid email address");
    this.errors.set(8,"Your email address is already verified");
    this.errors.set(9,"Resending the verification mail is only allowed once");
    this.errors.set(10,"email not verified")
    const jsonHeads = new HttpHeaders();
    jsonHeads.append('Content-Type', 'application/x-www-form-urlencoded');
    jsonHeads.append('Access-Control-Allow-Origin', '');
    jsonHeads.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin');
    this.options = { headers : jsonHeads, withCredentials: true } 
     if(this.debug==false)
    {
      this.testingURL="";
    }
   }

httpGet(url:string){
return this.http.get<GlobalResponse>(this.testingURL+url,this.options)
}

httpPost(url:string,data:any){
return this.http.post<GlobalResponse>(this.testingURL+url,data,this.options)
}
httpDelete(url:string){
  return this.http.delete<GlobalResponse>(this.testingURL+url,this.options)
  }
  httpPut(url:string,data:any){
    return this.http.post<GlobalResponse>(this.testingURL+url,data,this.options)
    }
errorHandler(err:HttpErrorResponse)
{
  return null;
}
goTo(str)
{
  this.router.navigate([str]);
}
updateLoggedIn(val)
{
  this.observeLoggedIn.next(val);
}
sendData(message: any) {
    this.subject.next(message);
}
getData(): Observable<any> {
    return this.subject.asObservable();
}
}
