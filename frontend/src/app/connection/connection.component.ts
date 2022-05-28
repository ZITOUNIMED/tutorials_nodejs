import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionService } from './connection.service';

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

  constructor(private connectionService: ConnectionService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(){
    const value = this.connectionForm.value;
    this.connectionService.login(value)
    .subscribe(res => {
      if(res.success){
        this.router.navigate(['/products'])
      }
    });
  }
}
