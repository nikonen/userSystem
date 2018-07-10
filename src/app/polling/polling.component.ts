import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "../message.service";
import decode from 'jwt-decode';
import { interval } from "rxjs/internal/observable/interval";
import { startWith } from "rxjs/internal/operators/startWith";
import { switchMap } from "rxjs/internal/operators/switchMap";
import { Pollingservice } from "../pollingservice";

@Component({
  selector: "app-polling",
  templateUrl: "./polling.component.html",
  styleUrls: ["./polling.component.css"]
})
export class PollingComponent implements OnInit {
  constructor(private router: Router, private messageService: MessageService, private pollingService: Pollingservice) {}

  messages: any;
  unread: any;
  id;
  length;
  ngOnInit() {

    this.id = this.getID();

    if (this.id != null) {
  
    
    interval(5000)
    .pipe(
      startWith(0),
      switchMap(() => this.pollingService.getMessages(this.id))
    ).subscribe(res=> {

      this.length = Object.keys(res).length;
      console.log(this.length);
      this.unread = res;
      console.log(res);
      
    });
    }
  }
  getID() {
    
    let token = localStorage.getItem("token");
    if (token != null) {
    let tokenPayload = decode(token);
    return tokenPayload.id;
    }
  }
  
  }