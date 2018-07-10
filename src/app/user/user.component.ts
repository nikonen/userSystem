import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewContainerRef, ViewRef, TemplateRef } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { trigger, transition, style, stagger, animate, query } from '@angular/animations';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from '../message.service';
import decode from 'jwt-decode';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],


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
export class UserComponent implements OnInit, AfterViewInit {
  @ViewChild('el', {read: TemplateRef}) el: TemplateRef<null>
  @ViewChild('vc',{read: ViewContainerRef}) vc: ViewContainerRef;
  view1: ViewRef;
  messageForm = new FormGroup({
    message: new FormControl()});
    
  users: any;
  params: any = this.route.snapshot.params;
  senderId = this.getID();
  constructor(private route:ActivatedRoute, private userService: UserService, private msgService: MessageService) { }

  ngOnInit() {


    console.log(this.params.id);

    this.userService.getUser(this.params.id)
    .subscribe(data => {
      this.users = data;
      console.log(data);
    });

    
  }

  ngAfterViewInit() {
    this.view1 = this.el.createEmbeddedView(null);
}

  onFormSubmit() {
    
    
    let message = this.messageForm.value.message;
    this.msgService.sendMessage(this.senderId, this.params.id, message)
    .subscribe(data=> {
      console.log(data);
      
    });
    this.hide();
  }

  getID() {
    let token = localStorage.getItem("token");

    let tokenPayload = decode(token);
    console.log("From profile: " + tokenPayload.id);
    return tokenPayload.id;
  }

  show() {
    this.vc.detach();
    this.vc.insert(this.view1);
  }

  hide() {
    this.vc.detach();
    this.vc.detach;
  }


    // or shortcut Type Casting
    // (<any> this.activatedRoute.snapshot.params).i
}
