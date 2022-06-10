import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-generate-pass-modal',
  templateUrl: './generate-pass-modal.component.html',
  styleUrls: ['./generate-pass-modal.component.css']
})
export class GeneratePassModalComponent implements OnInit {

  @Input() user: any;

  message = '';
  fail = false;
  success = false;

  constructor(public activeModal: NgbActiveModal, private usersService: UsersService) {}

  ngOnInit(): void {
    if(this.user){
      this.message = `Do you really want to generate a new password for ${this.user.firstName} ${this.user.lastName}?`;
    }
  }

  generatePassword(){
    this.usersService.generatePass(this.user)
    .subscribe({
      next: () => {
        this.message = 'New password was generated for this user. He will be informed by mail.';
        this.success = true;
        this.fail = false;
      },
      error: () => {
        this.message = 'An error was occured during password generation. Please try again!'
        this.fail = true;
        this.success = false;
      }
    });
  }
}
