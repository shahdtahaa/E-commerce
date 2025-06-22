import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/categories/icategory';
import { IProduct } from '../../core/interfaces/products/iproduct';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { ProductsService } from '../../core/services/products/products.service';
import { AuthService } from '../../core/services/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-products',
  imports: [RouterLink , SearchPipe , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit , OnDestroy {
 searchValue: string = '';
  productsData!: IProduct[];
  categoriesData!: ICategory[];
  productsub!: Subscription;
  // Array to hold IDs of wishlisted products
  wishlistIds: string[] = [];


  private readonly _WishlistService = inject(WishlistService);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _AuthService = inject(AuthService);

    constructor(private _CartService: CartService, private toastr: ToastrService){}


    
  addToCart(p_id: string) {
    this._CartService.AddProductToCart(p_id).subscribe({
      next: (res: any) => {
        console.log(res);
        console.log(res.numOfCartItems);
        this._CartService.cartCount.next(res.numOfCartItems);
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
}
