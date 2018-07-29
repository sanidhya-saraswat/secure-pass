import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.route';
import { CommonService } from './common/common.service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AppHttpInterceptor } from './AppHttpInterceptor';
import { SharedModule } from './common/shared.module';
import { EmptyComponent } from './empty/empty.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    EmptyComponent
  ],
  imports: [
   SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxCaptchaModule.forRoot({ reCaptcha2SiteKey: '6Ldb4WAUAAAAABcC4WUmOFhPfRcBVOkCiLGzj6tv'}),
  ],
  providers: [CommonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[]
})
export class AppModule { }
