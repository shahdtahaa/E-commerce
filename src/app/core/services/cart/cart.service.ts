import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviroment } from '../../../shared/enviroment/enviroment';
import { isPlatformBrowser } from '@angular/common';





@Injectable({
  providedIn: 'root',
})
export class CartService {

cartCount:BehaviorSubject <number>= new BehaviorSubject(0)

  constructor(private _HttpClient: HttpClient) {}

  private getUserToken(): any {
    return { token: sessionStorage.getItem('token') || '' };
  }

  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseURl}/api/v1/cart`, {
      headers: this.getUserToken(),
    });
  }

  AddProductToCart(p_id: string): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseURl}/api/v1/cart`,
      { productId: p_id },
      { headers: this.getUserToken() }
    );
  }

  removeSpecificCartItem(p_id: string): Observable<any> {
    return this._HttpClient.delete(`${enviroment.baseURl}/api/v1/cart/${p_id}`, {
      headers: this.getUserToken(),
    });
  }

  updateCartProductQuantity(p_id: string, count: number): Observable<any> {
    return this._HttpClient.put(
      `${enviroment.baseURl}/api/v1/cart/${p_id}`,
      { count },
      { headers: this.getUserToken() }
    );
  }

  clearUserCart(): Observable<any> {
    return this._HttpClient.delete(`${enviroment.baseURl}/api/v1/cart`, {
      headers: this.getUserToken(),
    });
  }

  computeTotalItems(cartData: any): number {
    let total = 0;
    if (cartData && cartData.products) {
      for (const product of cartData.products) {
        total += product.count;
      }
    }
    return total;
  }
}















// @Injectable({
//   providedIn: 'root',
// })
// export class CartService {
//   userToken:any;
//   cartCount :BehaviorSubject<number> = new BehaviorSubject(0); 

//   constructor(private _HttpClient: HttpClient , @Inject(PLATFORM_ID) private _PLATFORM_ID:any) {
//     if (isPlatformBrowser(this._PLATFORM_ID)) {
//       this.userToken= { token: sessionStorage.getItem('token') };
//     }else{
//       this.userToken= {}
//     }
//   }


//   getLoggedUserCart(): Observable<any> {
//     return this._HttpClient.get(`${enviroment.baseURl}/api/v1/cart`, {
//       headers: this.userToken,
//     });
//   }

  
//   AddProductToCart(p_id: string): Observable<any> {
//     return this._HttpClient.post(
//       `${enviroment.baseURl}/api/v1/cart`,
//       { productId: p_id },
//       { headers: this.userToken }
//     );
//   }


//   removeSpecificCartItem(p_id:string):Observable<any>{
//     return this._HttpClient.delete(`${enviroment.baseURl}/api/v1/cart/${p_id}` , {headers:this.userToken})

//   }


//   updateCartProductQuantity(p_id:string , count:number):Observable<any>{
//     return this._HttpClient.put(`${enviroment.baseURl}/api/v1/cart/${p_id}`, {"count":count} , {headers:this.userToken})
//   }

//   clearUserCart():Observable<any>{
//     return this._HttpClient.delete(`${enviroment.baseURl}/api/v1/cart` , {
//       headers:this.userToken
//     })
//   }






  
// }

// get | delete --> (URL , options)
// post |put -->>(URL , Body , options)
