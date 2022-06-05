import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  firstNameCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]);
  lastNameCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]);
  loginCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  emailCtrl = new FormControl('', [Validators.email]);
  passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  confirmPasswordCtrl = new FormControl('');

  signUpForm: FormGroup = new FormGroup({
    firstName: this.firstNameCtrl,
    lastName: this.lastNameCtrl,
    login: this.loginCtrl,
    email: this.emailCtrl,
    password: this.passwordCtrl,
    confirmPassword: this.confirmPasswordCtrl,
  });

  constructor(private connectionService: ConnectionService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.signUpForm.addValidators(this.passwordsEqualValidator());
  }

  submit() {
    if(this.signUpForm.valid){
      const value = this.signUpForm.value;
      this.connectionService.signUp(value)
      .subscribe({
        next: res => {
          this.authService.setAuthConf(res);
          this.router.navigate(['/products'])
        },
        error: err => {
          this.authService.setAuthConf({isAuthenticated: false, isAdmin: false, token: ''});
          console.log(err);
        }
      });
    }
  }

  passwordsEqualValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form: FormGroup = control as FormGroup;

      return (form.get('password')?.value !== form.get('confirmPassword')?.value) ? {passwordsDifferent: true} : null;
    }
  }
}
