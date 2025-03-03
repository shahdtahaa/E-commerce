import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { ProductsService } from '../../../core/services/products/products.service';
import { IWishlist } from '../../../core/interfaces/wishlist/iwishlist';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports:[CurrencyPipe],
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishlistProducts: any[] = [];

  constructor(
    private wishlistService: WishlistService,
    private productsService: ProductsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  
  loadWishlist(): void {
    this.wishlistService.getUserWishlist().subscribe({
      next: (res: IWishlist) => {
        console.log('Wishlist response data:', res.data);

        this.wishlistProducts = res.data;
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err);
      }
    });
  }
  
  deleteItemFromWishlist(productId: string): void {
    this.wishlistService.removeWishlistItem(productId).subscribe({
      next: (res) => {
        // Remove the product from the local array after deletion
        this.wishlistProducts = this.wishlistProducts.filter(p => p._id !== productId);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  addToCart(productId: string): void {
    this.wishlistService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res.message);
        this.toastr.success(res.message , 'FreshCart' , {closeButton:true , progressBar:true  , progressAnimation:'increasing' , timeOut:2000});

      },
      error: (err) => {
        console.error(err);
        this.toastr.error(err.message , 'FreshCart' , {closeButton:true , progressBar:true  , progressAnimation:'increasing' , timeOut:2000});

      }
    });
  }

}
