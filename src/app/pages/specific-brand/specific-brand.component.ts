import { BrandsService } from './../../core/services/brands/brands.service';
import { Component, inject } from '@angular/core';
import { IBrands } from '../../core/interfaces/brands/ibrands';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories/categories.service';

@Component({
  selector: 'app-specific-brand',
  imports: [],
  templateUrl: './specific-brand.component.html',
  styleUrl: './specific-brand.component.scss'
})
export class SpecificBrandComponent {

  brandID!: string;
  brandDetails: IBrands | null = null;
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _BrandsService = inject(BrandsService);


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((param) => {
      this.brandID = param.get('brand_id')!;
      this.loadBrandDetails();
    });
  }

  loadBrandDetails(): void {
    this._BrandsService.getSpecificBrand(this.brandID).subscribe({
      next: (res) => {
        this.brandDetails = res.data;
      },
      error: (err) => {
        console.error('Error fetching category details:', err);
      },
    });
  }

}
