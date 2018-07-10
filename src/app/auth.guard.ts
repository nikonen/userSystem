import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { log } from 'util';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import {AuthService} from './auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { httpFactory } from '@angular/http/src/http_module';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private auth: AuthService, private router: Router){}
  
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
