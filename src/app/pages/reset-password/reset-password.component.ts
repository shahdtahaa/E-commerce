import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/authentication/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  loading = false;
  resText: string = '';

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {}

    ResetPasswordForm: FormGroup = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      newPassword: new FormControl(null ,[Validators.required , Validators.pattern(/^\w{6,}$/)]),
    });
  

  ngOnInit() {
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.ResetPasswordForm.patchValue({ email: params['email'] });
    });
  }

  resetPassword() {
    if (this.ResetPasswordForm.valid) {
      this.loading = true;
      this._AuthService.resetPassword(this.ResetPasswordForm.value).subscribe({
        next: () => {
          this.loading = false;
          this._Router.navigate(['/login']);
        },
        error: (err) => {
          this.loading = false;
          this.resText = err.error.message || 'Something went wrong!';
        },
      });
    }
  }
}
