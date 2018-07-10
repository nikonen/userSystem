import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { UserService} from './user.service';
import { SecretComponent } from './secret/secret.component';
import { AuthService} from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent} from './user/user.component';
import { SuccessComponent } from './success/success.component';
import { SearchComponent } from './search/search.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { FileuploaderComponent } from './fileuploader/fileuploader.component';
import { MessageComponent } from './message/message.component';
import { PollingComponent } from './polling/polling.component';
import { NotifyComponent } from './notify/notify.component';
import decode from 'jwt-decode';
export function tokenGetter() {
  return localStorage.getItem('token');
}

const appRoutes = [

{path: '', component: HomeComponent},
{path: 'home', component: HomeComponent},
{path: 'user', component: UserComponent},
{path: 'user/:id', component: UserComponent},
{path: 'login', component: LoginComponent},
{path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
{path: 'secret', component: SecretComponent, canActivate:[AuthGuard]},
{path: 'signup', component: SignupComponent},
{path: 'success', component: SuccessComponent},
{path: 'search', component: SearchComponent},
{path: 'checklist', component: ChecklistComponent},
{path: 'fileuploader', component: FileuploaderComponent},
{path: 'message', component: MessageComponent, canActivate: [AuthGuard]},
{path: 'notify', component: NotifyComponent, canActivate: [AuthGuard],
{path: '**', component: NotfoundComponent}




];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserComponent,
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NotfoundComponent,
    SecretComponent,
    SuccessComponent,
    SearchComponent,
    ChecklistComponent,
    FileuploaderComponent,
    MessageComponent,
    PollingComponent,
    NotifyComponent,
    
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
  BrowserModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  FormsModule,
  HttpClientModule,
  JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      whitelistedDomains: ['localhost:4200'],
      blacklistedRoutes: ['localhost:3001/auth/'],
    }
    
  ],
  providers: [UserService, AuthGuard, AuthService, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
