import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../shared/enviroment/enviroment';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}


  private userInfoSubject = new BehaviorSubject<any>(null);
userInfo = this.userInfoSubject.asObservable(); // Observable for components

decodeToken() {
  const token = sessionStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      this.userInfoSubject.next(decoded);
    } catch (error) {
      console.error('Invalid token:', error);
      this.userInfoSubject.next(null);
    }
  } else {
    this.userInfoSubject.next(null);
  }
}
  // userInfo: any;

  // // decode token
  // decodeToken() {
  //   if (sessionStorage.getItem('token')) {
  //     this.userInfo = jwtDecode(sessionStorage.getItem('token')!);
  //   }
  // }

  // signup method
  signUp(data: object): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseURl}/api/v1/auth/signup`,
      data
    );
  }

  // signIn method

  signIn(data: object): Observable<any> {
    return this._HttpClient.post(
      `${enviroment.baseURl}/api/v1/auth/signin`,
      data
    );
  }



  ForgotPassword(email: string):Observable<any>{
    return this._HttpClient.post(`${enviroment.baseURl}/api/v1/auth/forgotPasswords` , {email})
  }

  sendVerificationCode(resetCode: string): Observable<any> {
    return this._HttpClient.post(`${enviroment.baseURl}/api/v1/auth/verifyResetCode`, { resetCode });
  }

  
  resetPassword(data: { email: string; newPassword: string }) {
    return this._HttpClient.put(`${enviroment.baseURl}/api/v1/auth/resetPassword`, data);
  }

  logOut() {
    sessionStorage.removeItem('token');
    this.userInfoSubject.next(null);
  }

}
