import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/core/src/util';
import { Subscriber } from 'rxjs';
import { Observable } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username;
  password;
  passwordAgain;
  email;
  loginForm;
  tmp: Observable<any>;
  constructor(private userService: UserService, private route: Router,
  private http: HttpClient) {

   }

  
  ngOnInit() {

  }

  login(event) {
    
    let temp: any;
    event.preventDefault();
    this.username = event.target.elements[0].value;
    this.password = event.target.elements[1].value;

    temp = this.userService.login(this.username, this.password)
    .subscribe(
      res => {
        console.log(res),
        console.log(temp),
        localStorage.setItem('token', res.jwt),
        window.location.assign('/home');
      }
    )

    
    }
    
  
}





