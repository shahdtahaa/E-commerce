import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../shared/enviroment/enviroment';



@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private _HttpClient: HttpClient) {}

  private getUserToken(): any {
    return { token: sessionStorage.getItem('token') || '' };
  }

  getUserWishlist(): Observable<any> {
    return this._HttpClient.get(`${enviroment.baseURl}/api/v1/wishlist`, {
      headers: this.getUserToken(),
    });
  }

  addProductToWishlist(p_id: string): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseURl}/api/v1/wishlist`,
      { productId: p_id },
      { headers: this.getUserToken() }
    );
  }

  removeWishlistItem(p_id: string): Observable<any> {
    return this._HttpClient.delete(`${enviroment.baseURl}/api/v1/wishlist/${p_id}`, {
      headers: this.getUserToken(),
    });
  }

  addProductToCart(p_id: string): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseURl}/api/v1/cart`,
      { productId: p_id },
      { headers: this.getUserToken() }
    );
  }
}














// @Injectable({
//   providedIn: 'root',
// })
// export class WishlistService {

//  userToken:any;
 
//   constructor(private _HttpClient: HttpClient , @Inject(PLATFORM_ID) private _PLATFORM_ID:any) {
//     if (isPlatformBrowser(this._PLATFORM_ID)) {
//       this.userToken= { token: sessionStorage.getItem('token') };
//     }else{
//       this.userToken= {}
//     }
//   }


//   getUserWishlist(): Observable<any> {
//     return this._HttpClient.get(`${enviroment.baseURl}/api/v1/wishlist`, {
//       headers: this.userToken,
//     });
//   }

//   addProductToWishlist(p_id: string): Observable<any> {
//     return this._HttpClient.post(
//       `${enviroment.baseURl}/api/v1/wishlist`,
//       { productId: p_id },
//       { headers: this.userToken }
//     );
//   }

//   removeWishlistItem(p_id: string): Observable<any> {
//     return this._HttpClient.delete(`${enviroment.baseURl}/api/v1/wishlist/${p_id}`, {
//       headers: this.userToken,
//     });
//   }

//   addProductToCart(p_id: string): Observable<any> {
//     return this._HttpClient.post(
//       `${enviroment.baseURl}/api/v1/cart`,
//       { productId: p_id },
//       { headers: this.userToken }
//     );
//   }
// }
