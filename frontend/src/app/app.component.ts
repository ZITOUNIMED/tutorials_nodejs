import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hideHeader = false;
  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.router.events.subscribe((res: any) => {
      if(res && res.url){
        this.hideHeader =  res.url.endsWith('connection') || res.url.endsWith('sign-up');
      }
    })
  }

  logout(){
    this.authService.setAuthConf({isAuthenticated: false, isAdmin: false, token: ''});
    this.router.navigate(['/connection']);
  }

  login(){
    this.authService.setAuthConf({isAuthenticated: false, isAdmin: false, token: ''});
    this.router.navigate(['/connection']);
  }

  signUp(){
    this.router.navigate(['/sign-up']);
  }

  userProfile(){
    this.router.navigate(['/user-profile']);
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }
}
