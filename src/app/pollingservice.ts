import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators/";
import { Message } from "./message";
import { Notification} from "./notification";

@Injectable({
    providedIn: 'root'
})

export class Pollingservice {

    url = 'http://localhost:82/phpangular/userSystem/src/api/polling.php';
    constructor(private http: HttpClient) {

    }

    getMessages(id: number): Observable<Message> {
        return this.http.post<Message>(this.url, {'id': id,'type':'message'})
        .pipe(
            map(res => new Message().deserialize(res))
        );
    }

    getNotifications(id: number): Observable<Notification> {
        return this.http.post<any>(this.url, {'id': id, 'type': 'notification'})
        .pipe(
            map(res=> new Notification().deserialize(res))
        );
    }
}



