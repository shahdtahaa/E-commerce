import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../core/interfaces/cart/icart';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})


export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  
  cartData: ICart |null = null;
  totalItems!: number;
  userToken: any = { token: sessionStorage.getItem('token')! };

  constructor(private _HttpClient: HttpClient) {}

ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({ 
      next: (res) => {
        console.log(res.data);
        this.cartData = res.data;
        this.totalItems = this._CartService.computeTotalItems(this.cartData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

deleteItemFromCart(p_id:string){
this._CartService.removeSpecificCartItem(p_id).subscribe({
  next:(res)=>{
    console.log(res);
    //  el line da el beykhali el html yehes bel tagher ama aamel remove 
    this.cartData=res.data;
    this.totalItems = this._CartService.computeTotalItems(this.cartData);

  }
})
}

updateCount(p_id:string  , count:number){
  this._CartService.updateCartProductQuantity(p_id , count).subscribe({
    next:(res)=>{
      console.log(res);
      this.cartData= res.data;
      this.totalItems = this._CartService.computeTotalItems(this.cartData);
    }
    
  })
}

clearCart(){
  this._CartService.clearUserCart().subscribe({
    next:(res)=>{
      console.log(res);
      this.cartData = res.data || { products: [], totalCartPrice: 0 };
      this.totalItems = this._CartService.computeTotalItems(this.cartData);
    }, 
    error:(err)=>{
      console.log(err);

      
    }
  })
}
}
