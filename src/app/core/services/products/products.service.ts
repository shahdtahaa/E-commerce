import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../shared/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
private readonly _HttpClient =inject(HttpClient)

  constructor() { }
  getAllProducts():Observable<any>{
    return this._HttpClient.get(`${enviroment.baseURl}/api/v1/products`)
  }


  getSpecificProduct(id:string):Observable<any>{

    return this._HttpClient.get(`${enviroment.baseURl}/api/v1/products/${id}`)
  }
}
