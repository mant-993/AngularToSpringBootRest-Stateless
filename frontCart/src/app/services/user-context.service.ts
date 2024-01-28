import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  constructor() { }

  private authenticated : boolean = false;
  private username : string = "";
  private token : string = "";

  setIsAuthenticated(bool : boolean){
    this.authenticated = bool
  }

  get isAuthenticated(){
    return this.authenticated
  }

  setUsername(name : string){
    this.username = name;
  }

  get gUsername(){
    return this.username;
  }

  setToken(token : string){
    this.token = token;
  }

  get gToken(){
    return this.token;
  }
}
