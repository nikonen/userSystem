import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { NotifyService } from '../notify.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  id = this.getID();
  notifications;
  constructor(private notifyService: NotifyService) { }

  ngOnInit() {

    this.notifyService.getNotifications(this.id)
    .subscribe(data=>{
      this.notifications = data;
      console.log(data);
    })
  }

  getID() {
    let token = localStorage.getItem("token");

    let tokenPayload = decode(token);
    console.log("From profile: " + tokenPayload.id);
    return tokenPayload.id;
  }

  markAsRead(id) {
    this.notifyService.markAsRead(id)
    .subscribe(data=>{
      console.log(data);
    })
    window.location.assign('/message');
  }

  sendNotification(whofrom, whoto, notification) {
    this.notifyService.sendNotify(this.id, whoto, 'message');
  }

  


}
