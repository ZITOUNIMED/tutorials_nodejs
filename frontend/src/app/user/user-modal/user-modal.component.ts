import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  firstNameCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]);
  lastNameCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]);
  loginCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  roleCtrl = new FormControl('USER', [Validators.required]);

  userForm: FormGroup = new FormGroup({
    firstName: this.firstNameCtrl,
    lastName: this.lastNameCtrl,
    login: this.loginCtrl,
    role: this.roleCtrl 
  });

  @Input() user: any;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if(this.user){
      this.loginCtrl.setValue(this.user.login);
      this.loginCtrl.disable();
      this.firstNameCtrl.setValue(this.user.firstName);
      this.lastNameCtrl.setValue(this.user.lastName);
      this.roleCtrl.setValue(this.user.role);
    }
  }

  submit(){
    const value = this.userForm.value;
    const login = this.user ? this.user.login : value.login;
    const id = this.user ? this.user.id : null;
    this.activeModal.close({...value, id: id, login: login});
  }

  close(){
    this.activeModal.close();
  }
}
