import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import decode from 'jwt-decode';
import { ENGINE_METHOD_DIGESTS } from 'constants';

@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css']
})
export class FileuploaderComponent {


  id;
  constructor(private http: HttpClient) { }

  
  uploadFile(event) {
    let element = event.target;
    console.log(element);
    if (element.files.length > 0) {
      console.log(element.files[0]);
      this.id = this.getID();
      let formData = new FormData();
      formData.append('file', element.files[0]);
      formData.append('id', this.id);

      this.http.post('http://localhost:82/phpangular/userSystem/src/api/upload.php',formData)
      .subscribe((data) => {

        let jsonResponse = data;
        
        console.log('got some data from backend');
        window.location.assign('localhost:4200/profile');
    }, (error) => {
      console.log('Error!', error);
    } );

    }

  }

  getID() {
    let token = localStorage.getItem('token');
    
    let tokenPayload = decode(token);
    console.log("From profile: " + tokenPayload.id);
    return tokenPayload.id;
  }
}
