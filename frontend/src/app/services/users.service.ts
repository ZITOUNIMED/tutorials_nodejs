import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = environment.api_url + '/users';

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<UserModel> {
    return this.http.get<UserModel>(this.url + '/profile');
  }

  remove(login: string): Observable<any> {
    return this.http.delete(this.url + `/${login}`);
  }

  create(product: UserModel): Observable<any> {
    return this.http.post(this.url, product);
  }

  update(user: UserModel): Observable<any> {
    return this.http.put(this.url, user);
  }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.url);
  }

  generatePass(user: UserModel) {
    return this.http.post(this.url + '/generate-pass', user);
  }
}

