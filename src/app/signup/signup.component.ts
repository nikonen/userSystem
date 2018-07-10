import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { passwordMatch } from './../password-match';
import { UserService } from "../user.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})



export class SignupComponent implements OnInit {
 
  status: any;
  passwordError:string;
  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('',[Validators.required, Validators.email, Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    passwordAgain: new FormControl('',[Validators.required, Validators.minLength(8)])
  });

  constructor(private userService: UserService) {}

  ngOnInit() {}

  get username() { return this.signupForm.get('username');}

  get email() { return this.signupForm.get('email'); }
     
  get password() { return this.signupForm.get('password'); }




  

  onFormSubmit() {
    let username = this.signupForm.value.username;
    let email = this.signupForm.value.email;
    let password = this.signupForm.value.password;
    let passwordAgain = this.signupForm.value.passwordAgain;

    if (password != passwordAgain) {
      this.passwordError = 'Passwords do not match';
    } else {
      this.passwordError = '';
      this.userService.signUpUser(username, email, password, passwordAgain)
      
    }




    
    
   }

   
}




