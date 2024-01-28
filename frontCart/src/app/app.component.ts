import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ProductsService } from './services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { OrdersService } from './services/orders.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ProductsService, UserService, OrdersService]
})
export class AppComponent {
  title = 'frontCart';
}
