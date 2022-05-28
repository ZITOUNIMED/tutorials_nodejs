import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConnectionModel } from '../models/connection.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  url = environment.api_url + '/login';
  constructor(private http: HttpClient) { }

  login(connection: ConnectionModel): Observable<any> {
    return this.http.post(this.url, connection);
  }
}
