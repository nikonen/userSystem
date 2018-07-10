import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Response } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

import { httpFactory } from "@angular/http/src/http_module";
import { Config } from "./config";


@Injectable({
  providedIn: "root"
})
export class UserService {
  check;
  tmp2: any;
  config: Config;
  items: any;
  readonly url =
    "http://localhost:82/phpangular/userSystem/src/api/userCtrl.php";

  constructor(private http: HttpClient, private router: Router) {
    //this.config = new Data('0', 'meh');
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.url, {
      'username': username,
      'password': password,
      'data': "login"
    });
  }

  getUser(id) {
    return this.http.post(this.url, { 'data': "getUser", id: id });
  }

  deleteUser(id) {
    return this.http.post(this.url, { 'data': "deleteUser", id: id });
  }

  searchUser(searchable:string) {
    let status;
    return this.http.post(this.url, {'data': 'searchUser', 'searchable': searchable})
  }

  signUpUser(username: string, email: string, password: string, passwordAgain: string) {
    
    let status;
    return this.http.post(this.url,{
      'data': "signUpUser",
      'username' : username,
      'email' : email,
      'password' : password,
      'passwordAgain': passwordAgain
    }).subscribe(data => {
          status = data;
          if (status === true) {
            this.router.navigate(['success']);
          }
    });
  }

  getUsers() {
    return this.http.post(this.url, { 'data': "getUsers" });
  }

  logOut() {}

  checkToken(token) {
    return this.http.post<any>(this.url, { 'data': "checkToken", token: token });
  }

  /** getTokenExp(token) {
    let check: boolean;

    this.checkToken(token).subscribe (data => {
      this.config = <Config>(data);
      console.log("authService ", this.config);
    },
    err => {
  
    });

    if (this.config.code == 0) {
      check = false;
    }

    if (this.config.code == 200) {
      check = true;
    }

    return check;
  }

  getTokenExp2(token) {
    this.checkToken(token).subscribe(
      res => {
        console.log(res),
        this.tmp2 = res;
      
  });
  }

  testToken() {
    let check: boolean;
    console.log(this.tmp2);
    
    if (this.tmp2.code == 0) {
      check = false;
      alert(0 + this.check);
    } 

    if (this.tmp2.code == 200) {
      check = true;
      alert(200 + this.check);
    }
  return true;
  
} **/
}
