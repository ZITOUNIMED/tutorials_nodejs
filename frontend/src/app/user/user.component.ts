import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { GeneratePassModalComponent } from './generate-pass-modal/generate-pass-modal.component';
import { UserModalComponent } from './user-modal/user-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UsersService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getUsers();
  }

  openModalUser(user?: UserModel){
    const modalRef = this.modalService.open(UserModalComponent);
    modalRef.componentInstance.user = user;

    modalRef.result
    .then(result => {
      if(result){
        if(result.id){
          this.update(result);
        } else {
          this.create(result);
        }
      }
    })
    .catch();
  }

  openModalGeneratePassword(user: UserModel){
    const modalRef = this.modalService.open(GeneratePassModalComponent);
    modalRef.componentInstance.user = user;

    modalRef.result
    .then(result => {
      if(result){
        console.log(result)
      }
    })
    .catch();
  }

  fillForm(user: UserModel){
    this.openModalUser(user);
  }

  remove(login: string): void {
    this.userService.remove(login)
    .subscribe(() => {
      this.getUsers();
    })
  }

  private create(user: UserModel){
    this.userService.create(user)
    .subscribe(users => {
      this.users = users;
    })
  }

  private update(user: UserModel){
    this.userService.update(user)
    .subscribe(users => {
      this.users = users;
    })
  }

  private getUsers(){
    this.userService.getUsers()
    .subscribe(users => {
      this.users = users;
    })
  }
}
