import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserContextService } from './user-context.service';
import { Observable } from 'rxjs';
import { Order } from '../objects/Order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http : HttpClient, private userContextService : UserContextService) {

  }

  getOrdersByUsername(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userContextService.gToken}`
    });
    
    const requestOptions = { headers: headers };
    return this.http.post('http://localhost:8080/api/orders/user', this.userContextService.gUsername, requestOptions)
  }

  getOrderByID(orderId : string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userContextService.gToken}`
    });
    
    const requestOptions = { headers: headers };
    return this.http.get(`http://localhost:8080/api/orders/${orderId}`, requestOptions)
  }

  deleteOrder(orderId : string) : Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userContextService.gToken}`
    });
    
    const requestOptions = { headers: headers };
    return this.http.delete(`http://localhost:8080/api/orders/${orderId}`, requestOptions)

  }

  postNewOrder(order : Order): Observable<any> {
    console.log(order)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userContextService.gToken}`
    });
    
    const requestOptions = { headers: headers };
    return this.http.post('http://localhost:8080/api/orders', order, requestOptions)  // no need to JSON.stringify(order)
  }
}
