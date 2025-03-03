import { Message } from './../../../../node_modules/@angular-devkit/build-angular/node_modules/postcss/lib/result.d';
import { Register } from './../../../../node_modules/any-promise/register.d';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  
  // variables
  loading: boolean = false;
  resText = !String;

  // injection
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\w{6,}$/),
      ]),
      rePassword: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.compare
  );
  // or {validators :[this.compare]} law andy aktar men wahda haamelhaa

  register(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this._AuthService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(this.registerForm);
          this.loading = false;
          this._Router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err.error.message);
          this.resText = err.error.message;
          this.loading = false;
        },
      });
    } else {
      this.registerForm.setErrors({ mismatch: true });
      this.registerForm.markAllAsTouched();
    }
  }

  compare(fgroup: AbstractControl) {
    return fgroup.get('password')?.value === fgroup.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }
}
