import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileData : any;

  constructor(private userService : UserService){

  }

  ngOnInit(){
    this.userService.handleProfile()
    .subscribe({
      next: (res) => {
        console.log(res);
        this.profileData = res;
        console.log(this.profileData);
      },
      error: (err) => console.error(err),
      complete: () => console.info('complete') 
    })
    
  }

}
