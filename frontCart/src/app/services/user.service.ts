import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserContextService } from './user-context.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  isAuthenticated : boolean = false;
  username : String = "";
  token : String = "";

  constructor(private http : HttpClient, private userContextService : UserContextService) {

  }

  handleProfile(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userContextService.gToken}`
    });
    const requestOptions = { headers: headers };
    return this.http.get("http://localhost:8080/users/profile",  requestOptions);
  }

  handleLogin(user : any): Observable<any> {
    return this.http.post("http://localhost:8080/users/login", user, { headers : { 'content-type': 'application/json'}});
  }

  handleRegistration(user : string): Observable<any> {
    return this.http.post("http://localhost:8080/users/registration", user, { headers : { 'content-type': 'application/json'}});
  }
}
