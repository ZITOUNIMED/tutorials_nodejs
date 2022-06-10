import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-generate-pass',
  templateUrl: './generate-pass.component.html',
  styleUrls: ['./generate-pass.component.css']
})
export class GeneratePassComponent implements OnInit {
  @Input() user: any;
  message = '';
  success = false;
  fail = false;
  constructor(public activeModal: NgbActiveModal, private userService: UsersService) {}

  ngOnInit(): void {
    if(this.user){
      this.message = `Do you really want to generate a new password for ${this.user.firstName} ${this.user.lastName}?`;
    }
  }

  generatePass(){
    this.userService.generatePass(this.user)
    .subscribe({
      next: () => {
        this.message = 'New password was generated for user. He will be informed by mail.';
        this.success = true;
        this.fail = false;
      },
      error: () => {
        this.message = 'An error was occured during password generation. Please try again!';
        this.success = false;
        this.fail = true;
      }
    });
  }
}
