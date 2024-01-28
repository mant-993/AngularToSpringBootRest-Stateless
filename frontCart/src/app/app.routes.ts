import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { ErrorComponent } from './components/error/error.component';
import { ProfileComponent } from './components/profile/profile.component';
import { protectedRouteGuard } from './guards/ProtectedRouteGuard';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent, canActivate : [protectedRouteGuard]},
    { path: 'register', component: RegisterComponent, canDeactivate: [(component: RegisterComponent) => component.canExit()]},
    { path: 'cart', component: CartComponent, canActivate : [protectedRouteGuard] },
    { path: 'cart/:orderId', component: OrderDetailsComponent, canActivate : [protectedRouteGuard] },
    { path: 'profile', component: ProfileComponent, canActivate : [protectedRouteGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: ErrorComponent },

];
