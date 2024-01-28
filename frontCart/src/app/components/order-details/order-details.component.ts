import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {

  orderId : string = "";
  order : any;

  constructor(private activatedRoute : ActivatedRoute, private ordersService : OrdersService){

  }


  ngOnInit() {
    
    this.orderId = this.activatedRoute.snapshot.params['orderId'];
    this.ordersService.getOrderByID(this.orderId)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.order = res;
      },
      error: (err) => console.error(err),
      complete: () => console.info('complete') 
    })



    
  }

}
