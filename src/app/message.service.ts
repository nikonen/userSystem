import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  readonly url = 'http://localhost:82/phpangular/userSystem/src/api/messageCtrl.php';

  constructor(private http: HttpClient) { }


  sendMessage(senderId:number, receiverId:number, message: string) {
    return this.http.post(this.url, 
      {'data': 'sendMessage',
        'senderId': senderId,
        'receiverId': receiverId,
        'message': message});
  }

  deleteMessage(id) {
    return this.http.post(this.url,
        {'data': 'deleteMessage',
          'id': id})
  }

  markAsRead(messageId: number) {
    return this.http.post(this.url, 
    {'data': 'markAsRead',
      'id': messageId});
  }

  getMessages(receiverId:number) {
    return this.http.post(this.url, 
      {'data': 'getMessages',
        'receiverId': receiverId});
  }

  getUnread(recieverId:number){
    return this.http.post(this.url, 
      {'data': 'getUnread',
        'receiverId': 'receiverId'});
    }

  
}
