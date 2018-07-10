import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  readonly url = 'http://localhost:82/phpangular/userSystem/src/api/notifyCtrl.php';
  constructor(private http: HttpClient) { }

  /**
   * 
   * @param senderId who sent message, he/she will be notified
   * @param receiverId Just in case
   * @param notification notification message
   */
  sendNotify(senderId: number, receiverId: number, notification: string) {
    return this.http.post(this.url, 
        {'data': 'sendNotification',
          'notifyTo': senderId,
          'notifyFrom': receiverId,
          'notification': notification
        })

        alert("NotifyTo: " + senderId + " notifyFrom: " + receiverId);
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

  getNotifications(receiverId:number) {
    return this.http.post(this.url, 
      {'data': 'getNotifications',
        'notifyTo': receiverId});
  }

  getUnread(recieverId:number){
    return this.http.post(this.url, 
      {'data': 'getUnread',
        'receiverId': 'receiverId'});
    }


}
