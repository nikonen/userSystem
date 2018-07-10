import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "../message.service";
import decode from 'jwt-decode';
import { interval } from "rxjs/internal/observable/interval";
import { startWith } from "rxjs/internal/operators/startWith";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { Pollingservice } from "../pollingservice";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {
  constructor(private router: Router, private messageService: MessageService, private pollingService: Pollingservice) {}

  messages: any;
  unread: any;
  id;
  ngOnInit() {

    this.id = this.getID();
 
    this.messageService.getMessages(this.id)
    .subscribe(data => {
      this.messages = data;
      console.log(this.messages);
    })

    if (this.id != null) {
  
    
    /**interval(5000)
    .pipe(
      startWith(0),
      switchMap(() => this.pollingService.getMessages(this.id))
    ).subscribe(res=> {
      console.log(res);
      
    }); **/
    } 
  }
  getID() {
    
    let token = localStorage.getItem("token");
    if (token != null) {
    let tokenPayload = decode(token);
    return tokenPayload.id;
    }
  }

  markAsRead(id) {
    this.messageService.markAsRead(id)
    .subscribe(data=>{
      console.log(data);
    })
    window.location.assign('/message');
  }

  deleteMessage(id) {
    this.messageService.deleteMessage(id)
    .subscribe(data=>{
      console.log(data);
    })
    window.location.assign('/message');
  }
  
  }