import { NavbarComponent } from './../../../layouts/navbar/navbar.component';
import { Component, inject, InjectFlags, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { IProduct } from '../../../core/interfaces/products/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CartService = inject(CartService);
  productID!: string;
  productDetails: IProduct | null = null;

  constructor(
    private _ProductsService: ProductsService,
    private toastr: ToastrService
  ) {}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.productID = param.get('p_id')!;
      },
    });

    this._ProductsService.getSpecificProduct(this.productID).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      },
      error: (err) => {},
    });
  }

  addToCart() {
    this._CartService.AddProductToCart(this.productID).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(res.message, 'FreshCart', {
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 2000,
          // toastClass: 'toast-style',
          // positionClass: 'toastr-position',
        
        });
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.message, 'FreshCart', {
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 2000,
          // positionClass: 'toastr-position',
          // toastClass: 'toast-style',
        });
      },
    });
  }
}
