import { Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
import { EmptyComponent } from "./empty/empty.component";
export const routes:Routes=     [
    { path: '', component: EmptyComponent},
    { path: 'signUp', component: RegisterComponent},
    { path: 'signIn', component: LoginComponent},
    { path: 'verifyEmail/:result', component: VerifyEmailComponent},
    {path:'error',loadChildren:'./error-pages/error-pages.module#ErrorPagesModule'},
    {path:'dashboard',loadChildren:'./user/user.module#UserModule'},
    {path:'home',loadChildren:'./home/home.module#HomeModule'},
    {path: '**', redirectTo: '/error/404'},
];