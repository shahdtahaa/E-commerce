import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/interfaces/products/iproduct';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/authentication/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, SearchPipe, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], // note: ensure this is "styleUrls"
})

export class HomeComponent implements OnInit, OnDestroy {
  searchValue: string = '';
  productsData!: IProduct[];
  categoriesData!: ICategory[];
  productsub!: Subscription;
  // Array to hold IDs of wishlisted products
  wishlistIds: string[] = [];

  private readonly _ProductsService = inject(ProductsService);
  private readonly _AuthService = inject(AuthService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _WishlistService = inject(WishlistService);

  constructor(private _CartService: CartService, private toastr: ToastrService) {}

  addToCart(p_id: string) {
    this._CartService.AddProductToCart(p_id).subscribe({
      next: (res: any) => {
        console.log(res.numOfCartItems);
        this._CartService.cartCount.next(res.numOfCartItems);
        console.log(this._CartService.cartCount);
        
        this.toastr.success(res.message, 'FreshCart', {
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 2000,
        });
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.message, 'FreshCart', {
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 2000,
        });
      },
    });
  }

  addToWishlist(p_id: string) {
    this._WishlistService.addProductToWishlist(p_id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toastr.success(res.message, 'FreshCart', {
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 2000,
        });
        // Update wishlistIds if this product id is not already present
        if (!this.wishlistIds.includes(p_id)) {
          this.wishlistIds.push(p_id);
        }
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.message, 'FreshCart', {
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 2000,
        });
      },
    });
  }

  ngOnInit(): void {
    console.log(this._AuthService.userInfo);

    this.productsub = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categoriesData = res.data;
      },
    });
    this.productsub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productsData = res.data;
        console.log(this.productsData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.productsub?.unsubscribe();
  }

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    pullDrag: false,
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

  categoriesSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };
}
