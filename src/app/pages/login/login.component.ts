import { JwtDecodeOptions } from './../../../../node_modules/jwt-decode/build/esm/index.d';
import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../core/services/authentication/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

resText!:string;
loading :boolean= false;

private readonly _AuthService = inject(AuthService)
private readonly _Router = inject(Router)

  // null --> is the intial value momken aamel ay init value ady 
  LoginForm: FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null ,[Validators.required , Validators.pattern(/^\w{6,}$/)]),
 } )

 login():void {
  if(this.LoginForm.valid){
    this.loading= true;
    console.log(this.LoginForm);

    this._AuthService.signIn(this.LoginForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.loading=false;
        // 1- hold and save the token
        sessionStorage.setItem('token' , res.token);
        // 2-decode token
        this._Router.navigate(['/home']);
        
      },
      
      error:(err)=>{
        console.log(err.error.message);
        this.resText=err.error.message;
        this.loading= false;
        
      }
      
    })
  }
  else{
    this.LoginForm.markAllAsTouched();
  }
 }
 goToForgotPassword() {
  this._Router.navigate(['/forgotPasswords']);
}
 

} 
