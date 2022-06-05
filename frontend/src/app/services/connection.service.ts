import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignInModel } from '../models/sign-in.model';
import { SignUpModel } from '../models/sign-up.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  url = environment.api_url + '/connection';

  constructor(private http: HttpClient) { }

  signIn(signIn: SignInModel): Observable<any> {
    return this.http.post(this.url+'/sign-in', signIn);
  }

  signUp(signUp: SignUpModel): Observable<any> {
    return this.http.post(this.url+'/sign-up', signUp);
  }
}
