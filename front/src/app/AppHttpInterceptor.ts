import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { CommonService } from './common/common.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private cs:CommonService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => { }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
if(err.status==500){
this.cs.goTo('/error/500');
}
if(err.status==401)
{
  this.cs.goTo('/error/401');
}
      }
    }));
  }
}