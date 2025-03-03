import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { enviroment } from '../../../shared/enviroment/enviroment';
import { isPlatformBrowser } from '@angular/common';
import { ToastPackage } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
userToken:any;
  constructor(private _HttpClient: HttpClient , 
    @Inject(PLATFORM_ID) private _PLATFORM_ID:any
  ) { 

    if(isPlatformBrowser(this._PLATFORM_ID)){
      this.userToken = {token :sessionStorage.getItem('token')};
    }else{
      this.userToken = {};
    }
   
  }

  checkOutSession(c_id:string , data:object):Observable<any>{
    return this._HttpClient.post(`${enviroment.baseURl}/api/v1/orders/checkout-session/${c_id}?url=${enviroment.domain}`,
      {'shippingAddress': data},
      {headers: this.userToken}

    )
  }

  
getUserOrders(c_id:string):Observable<any>{
  return this._HttpClient.get(`${enviroment.baseURl}/api/v1/orders/user/${c_id}`)
}

}
