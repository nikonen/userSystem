import { Component, OnInit } from '@angular/core';
import { getDefaultService } from 'selenium-webdriver/opera';
import { UserService } from '../user.service';
import { config } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { getLocaleTimeFormat } from '@angular/common';
import { Config } from '../config';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

  animations: [
    trigger('listStagger', [
      transition('*<=>*',[
        query(':enter',
      [
        style({opacity: 0, transform: 'translateY(-20px)'}),
        stagger('200ms',
        animate('550ms ease-out',
      style({opacity: 1, transform: 'translateY(0px)'})))
      ], {optional: true})
    ])
  ])
]

})

export class ProfileComponent implements OnInit {

  tmp: any;
  token: any;
  tmp2: any;
  config: Config;
  id;
  constructor(private userService: UserService, private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
  /***  this.token = localStorage.getItem('token');
    this.tmp = this.userService.checkToken(this.token).subscribe(
      data => {
        this.config = <Config>(data);
        console.log("This should be the response???: ", this.config);
      },
      err => {
    
      }); **/

    this.id = this.getID();
    this.getUser(this.id);
    }

  getUser(id) {
    this.userService.getUser(id).subscribe(
      res => {
        console.log(res),
        this.tmp2 = res;
      });
  }

  getID() {
    let token = localStorage.getItem('token');
    
    let tokenPayload = decode(token);
    console.log("From profile: " + tokenPayload.id);
    return tokenPayload.id;
  }
  
    
}







