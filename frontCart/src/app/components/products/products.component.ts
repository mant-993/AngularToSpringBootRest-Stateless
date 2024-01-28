import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../objects/Product';
import { Order } from '../../objects/Order';
import { UserContextService } from '../../services/user-context.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productList : any;
  productsToOrder : Product[] = [];
  message : string = "";
  isMessageHidden = true;
  disabled = true;
  timeout : any;

  constructor(private productsService: ProductsService, private userContextService : UserContextService, private ordersService : OrdersService){

  }

  ngOnInit() {
    //console.log('OnInit');
    this.productsService.getProducts()
    .subscribe({
      next: (res) => {
        console.log(res);
        this.productList = res;
      },
      error: (err) => console.error(err),
      complete: () => console.info('complete') 
    })
      
  }

  addProduct(prod : Product){
    clearTimeout(this.timeout);
    this.productsToOrder = [...this.productsToOrder, prod]
    this.message = `${prod.name} added to your order.`
    this.isMessageHidden = false;
    this.disabled = false;
    this.timeout = setTimeout(() => {
      this.isMessageHidden = true;
    }, 800)
  }

  submitOrder(){
    const newOrder = new Order(this.productsToOrder, this.userContextService.gUsername);
    this.ordersService.postNewOrder(newOrder)
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.error(err),
      complete: () => {
        this.productsToOrder=[];
        this.disabled = true;
        alert("Order successfully created.")
      }
    })

  }

}
