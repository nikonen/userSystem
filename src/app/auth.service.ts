import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { httpFactory } from '@angular/http/src/http_module';
import decode from 'jwt-decode';

@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) {}

  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    
    let tokenPayload = decode(token);
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

}