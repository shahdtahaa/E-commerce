import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../shared/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

   
  constructor( private _HttpClient:HttpClient) { }

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${enviroment.baseURl}/api/v1/categories`)
  }

  getCpecificCategory(cat_id:string):Observable<any>{
    return this._HttpClient.get(`${enviroment.baseURl}/api/v1/categories/${cat_id}`)
  }
}
