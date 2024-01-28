import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { UserContextService } from './user-context.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient, private userContextService : UserContextService) {

  }

  getProducts(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userContextService.gToken}`
    });
    
    const requestOptions = { headers: headers };
    return this.http.get('http://localhost:8080/api/products', requestOptions)
  }


}
