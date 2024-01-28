import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserContextService } from '../../services/user-context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isMessageHidden = true;
  loginFailedMsg = "Login has failed, try again."

  constructor(private userService : UserService, private userContextService : UserContextService, private router:Router){

  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
 

  get username() {
    return this.loginForm.get('username');
  } 
 
  get password() {
    return this.loginForm.get('password');
  } 
 

  onSubmit() {
    console.log(this.loginForm.value);
    this.userService.handleLogin(JSON.stringify(this.loginForm.value))
    .subscribe({
      next: (res) => {
        console.log(res);
        this.userContextService.setIsAuthenticated(true);
        this.userContextService.setUsername(res.username);
        this.userContextService.setToken(res.token);
        
      },
      error: (err) => {
        console.error(err);
        this.isMessageHidden = false;
        setTimeout(()=>{
          this.isMessageHidden = true;
        },1500)
      },
      complete: () => {
        this.router.navigateByUrl('home')
      }
    })
  }


}
