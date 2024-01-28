import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserContextService } from '../../services/user-context.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  constructor(private userContextService : UserContextService, private cdr: ChangeDetectorRef, private router:Router){

  }

  auth = false; 
  item = 0;

  ngOnInit() {
    return setInterval(() => {
          this.auth = this.userContextService.isAuthenticated
          this.item++;
          this.cdr.markForCheck();
    }, 100);
  }

  handleLogout(){
    this.userContextService.setIsAuthenticated(false);
    this.userContextService.setToken("");
    this.userContextService.setUsername("");
    this.router.navigateByUrl('home')
  }

}
