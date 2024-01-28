import { Component } from '@angular/core';
import { UserContextService } from '../../services/user-context.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private userContextService : UserContextService){

  }

  user : string = "";

  ngOnInit(){
    this.user = this.userContextService.gUsername;
  }

}
