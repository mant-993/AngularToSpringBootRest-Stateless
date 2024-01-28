import { Component } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  ordersList : any;
  item = 0;

  constructor(private ordersService: OrdersService, private router : Router){

  }

  ngOnInit() {
    
    console.log('OnInit');
    this.ordersService.getOrdersByUsername()
    .subscribe({
      next: (res) => {
        console.log(res);
        this.ordersList = res;
      },
      error: (err) => console.error(err),
      complete: () => console.info('complete') 
    })
      
  }

  toProductDetails(orderID : string){
    this.router.navigate(['/cart', orderID])
  }

  handleDelete(orderID : string){
    this.ordersService.deleteOrder(orderID)
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.error(err),
      complete: () => {
        this.ngOnInit();
      }
    })
  }

}
