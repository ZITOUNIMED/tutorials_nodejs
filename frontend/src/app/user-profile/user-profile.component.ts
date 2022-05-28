import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUserProfile()
    .subscribe(user => {
      this.user = user;
    });
  }
}
