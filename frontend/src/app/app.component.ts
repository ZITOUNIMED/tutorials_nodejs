import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isConnectionPage = false;
  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.router.events.subscribe((res: any) => {
      if(res && res.url){
        this.isConnectionPage =  res.url.endsWith('connection')
      }
    })
  }

  logout(){
    this.authService.setAuthConf({userId: 0, isAuthenticated: false, isAdmin: false});
    this.router.navigate(['/connection']);
  }

  login(){
    this.authService.setAuthConf({userId: 0, isAuthenticated: false, isAdmin: false});
    this.router.navigate(['/connection']);
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
