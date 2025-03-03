import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/authentication/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  resText!: string;
  loading :boolean= false;


  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  // null --> is the intial value momken aamel ay init value ady
  ForgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  sendVerificationCode(): void {
    if (this.ForgotPasswordForm.valid) {
      this.loading = true;
      const email = this.ForgotPasswordForm.value.email;
  
      this._AuthService.ForgotPassword(email).subscribe({
        next: () => {
          this.loading = false;
          // Navigate to Verify Code component and pass the email
          this._Router.navigate(['/verifyResetCode'], { queryParams: { email } });
        },
        error: (err) => {
          console.log(err.error.message);
          this.resText = err.error.message;
          this.loading = false;
        }
      });
    } else {
      this.ForgotPasswordForm.markAllAsTouched();
    }
  }
  

  // ForgetPassword() {
  //   if (this.ForgotPasswordForm.valid) {
  //     this.loading= true;
  //     console.log(this.ForgotPasswordForm);
      
      
  //     const email = this.ForgotPasswordForm.value.email;

  //     this._AuthService.ForgotPassword(email).subscribe({
  //       next:(res)=>{
  //         console.log(res);
  //         this.loading=false;
  //         // 1- hold and save the token
  //         sessionStorage.setItem('token' , res.token);
  //         // 2-decode token
  //         this._Router.navigate(['/home']);
          
  //       },

  //       error:(err)=>{
  //         console.log(err.error.message);
  //         this.resText=err.error.message;
  //         this.loading= false;
          
  //       }

  //     })
  //   }
  // }



}
