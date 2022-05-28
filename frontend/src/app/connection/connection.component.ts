import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  connectionForm: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private connectionService: ConnectionService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  submit(){
    const value = this.connectionForm.value;
    this.connectionService.login(value)
    .subscribe({
      next: res => {
        if(res.isAuthenticated){
          this.authService.setAuthConf(res);
          this.router.navigate(['/products'])
        }
      },
      error: err => {
        this.authService.setAuthConf({userId: 0, isAuthenticated: false});
        console.log(err);
      }
    });
  }
}
