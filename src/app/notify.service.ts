import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  readonly url = 'http://localhost:82/phpangular/userSystem/src/api/notifyCtrl.php';
  constructor(private http: HttpClient) { }

  sendNotify(senderId: number, receiverId: number, notification: string) {
    this.http.post(this.url, 
        {'data': 'sendNotify',
          'senderId:': senderId,
          'receiverId': receiverId,
          'notification': notification
        })
  }

  deleteNotify(id) {
    return this.http.post(this.url,
        {'data': 'deleteNotify',
          'id': id})
  }

  markAsRead(messageId: number) {
    return this.http.post(this.url, 
    {'data': 'markAsRead',
      'id': messageId});
  }

  getNotify(receiverId:number) {
    return this.http.post(this.url, 
      {'data': 'getNotify',
        'receiverId': receiverId});
  }

  getUnread(recieverId:number){
    return this.http.post(this.url, 
      {'data': 'getUnread',
        'receiverId': 'receiverId'});
    }


}
