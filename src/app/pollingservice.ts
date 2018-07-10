import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators/";
import { Message } from "./message";

@Injectable({
    providedIn: 'root'
})

export class Pollingservice {

    url = 'http://localhost:82/phpangular/userSystem/src/api/polling.php';
    constructor(private http: HttpClient) {

    }

    getMessages(id: number): Observable<Message> {
        return this.http.post<Message>(this.url, {'id': id})
        .pipe(
            map(res => new Message().deserialize(res))
        );
    }
}



