import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService){}

  logout(){
    this.authService.setAuthConf({userId: 0, isAuthenticated: false});
    this.router.navigate(['/connection']);
  }

  login(){
    this.authService.setAuthConf({userId: 0, isAuthenticated: false});
    this.router.navigate(['/connection']);
  }

  userProfile(){
    this.router.navigate(['/user-profile']);
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
