import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{

  isMessageHidden = true;
  registrationFailedMsg = "Registration has failed, try again."

  constructor(private userService : UserService, private router : Router){

  }

  registrationForm = new FormGroup({
    fullname: new FormControl('',[Validators.required,Validators.minLength(10)]),
    username: new FormControl('',[Validators.required,Validators.minLength(5)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    street:new FormControl('',[Validators.required]),
    city: new FormControl('',[Validators.required]),
    state: new FormControl('',[Validators.required]),
    zip: new FormControl('',[Validators.required, Validators.pattern('[0-9]{5}')]),
    phoneNumber: new FormControl('',[Validators.required, Validators.pattern('[- +()0-9]{6,}')]),
  })
 

  get fullname() {
    return this.registrationForm.get('fullname');
  } 

  get username() {
    return this.registrationForm.get('username');
  } 
 
  get password() {
    return this.registrationForm.get('password');
  } 
 
  get street() {
    return this.registrationForm.get('street');
  } 
 
  get city() {
    return this.registrationForm.get('city');
  } 
 
  get state() {
    return this.registrationForm.get('state');
  } 
 
  get zip() {
    return this.registrationForm.get('zip');
  } 

  get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
  } 
 

  onSubmit() {
    console.log(this.registrationForm.value);

    this.userService.handleRegistration(JSON.stringify(this.registrationForm.value))
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err); 
        this.isMessageHidden = false;
        setTimeout(()=>{
          this.isMessageHidden = true;
        },1500)
      },
      complete: () => {
        this.registrationForm.markAsPristine();       // sets form as undirty to untrigger deactivate guard
        this.router.navigateByUrl('home');
      }
    })

  }

  canExit() : boolean {
    if(!this.registrationForm.dirty){
      return true;
    }else{
      if (confirm("Quit the registration form? you'll lose all the changes.")) {
        return true
      } else {
        return false
      }
    }
  }

  


}
