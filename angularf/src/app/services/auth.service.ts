import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variables
  authUrl = 'http://10.8.0.1/oauth/token';
  apiUrl = 'http://10.8.0.1/api';



  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value:boolean){
    this.loggedIn.next(value);
  }

  setUid(uid:any){
    return localStorage.setItem('uid',uid);
  }
  getUid(){
    return localStorage.getItem('uid');
  }
  removeUid(){
    return localStorage.removeItem('uid');
  }

  autoLogout(expiration: number){
    setTimeout(() => {
      this.logout();
    }, expiration*1000);
  }

  logout(){
    this.token.remove();
    this.changeAuthStatus(false);
    this.removeUid();
    this.router.navigate(['/login']);
  }

  constructor(private token:TokenService, private router:Router) { }
}
