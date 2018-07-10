import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { Input } from '@angular/core';
import { User } from '../user';
import {trigger,state, style, animate,transition, group, query, stagger} from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: "app-secret",
  templateUrl: "./secret.component.html",
  styleUrls: ["./secret.component.css"],

  animations: [
    trigger('listStagger', [
      transition('*<=>*',[
        query(':enter',
      [
        style({opacity: 0, transform: 'translateY(-20px)'}),
        stagger('200ms',
        animate('550ms ease-out',
      style({opacity: 1, transform: 'translateY(0px)'})))
      ], {optional: true}),
      query(':leave',
      [
        style({opacity: 1, transform: 'translateY(+20px)'}),
        stagger('200ms',
        animate('550ms ease-in',
      style({opacity: 0, transform: 'translateY(0px)'})))
      ], {optional: true})
    ])
  ])
]

})


export class SecretComponent implements OnInit {

  users: any;
  show;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getUsers();

  }

  getUsers() {
    this.userService.getUsers().
    subscribe( data => {
      this.users = data,
      console.log(data);
  });

  }

  deleteUser(id) {
    this.userService.deleteUser(id).
    subscribe( data => {
      console.log(data);
    })
  }

}

