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
  emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  passwordCtrl = new FormControl('', [Validators.required]);
  confirmPasswordCtrl = new FormControl('', [Validators.required]);

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
    this.signUpForm.addValidators(this.equalPasswordsValidator());
    this.signUpForm.addValidators(this.allControlsValidValidator());
  }

  submit(){
    if(this.signUpForm.valid){
      const value = this.signUpForm.value;
      this.connectionService.signUp(value)
      .subscribe({
        next: res => {
          this.authService.setAuthConf(res);
          this.router.navigate(['/products'])
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }

  private equalPasswordsValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password !== confirmPassword ? {unequalPasswords: true} : null;
    }
  }

  private allControlsValidValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const controls = (group as FormGroup).controls;
      return Object.keys((group as FormGroup).controls).map(key => {
        return controls[key].errors ? {[key] : controls[key].errors} : null;
      }).filter(item => !!item);
    }
  }

}
