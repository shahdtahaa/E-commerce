import { BrandsService } from './../../core/services/brands/brands.service';
import { Component, inject } from '@angular/core';
import { IBrands } from '../../core/interfaces/brands/ibrands';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/authentication/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

    brandsData!: IBrands[];
     brandsSub!: Subscription;
    private readonly _BrandsService = inject(BrandsService);
    private readonly _AuthService = inject(AuthService);

    
  ngOnInit(): void {
    console.log(this._AuthService.userInfo);
    this.brandsSub = this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsData = res.data;
        console.log(this.brandsData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.brandsSub?.unsubscribe();
  }
}
