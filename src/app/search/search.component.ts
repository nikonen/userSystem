import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  users:any;
  signupForm = new FormGroup({
    search: new FormControl() });

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onFormSubmit() {
    let search = this.signupForm.value.search;
    this.userService.searchUser(search);
  }

  onSearchChange(searchValue : string ) {  
    this.userService.searchUser(searchValue).subscribe(data => {
      this.users = data;
      console.log(this.users);
    });

}

}
