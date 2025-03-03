import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/authentication/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-reset-code',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-reset-code.component.html',
  styleUrl: './verify-reset-code.component.scss',
})
export class VerifyResetCodeComponent  implements OnInit{
  resText!: string;
  loading: boolean = false;
  email!: string;  // Store the email

  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  VerifyResetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required , Validators.minLength(5)])
  });

  ngOnInit(): void {
    // Get the email from query params
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  verifyCode(): void {
    if (this.VerifyResetCodeForm.valid) {
      this.loading = true;
      const resetCode = this.VerifyResetCodeForm.value.resetCode;

      this._AuthService.sendVerificationCode(resetCode).subscribe({
        next: () => {
          this.loading = false;
          this._Router.navigate(['/resetPassword'], { queryParams: { email: this.email } });
        },
        error: (err) => {
          console.log(err.error.message);
          this.resText = err.error.message;
          this.loading = false;
        },
      });
    } else {
      this.VerifyResetCodeForm.markAllAsTouched();
    }
  }
}
