import { Injectable,EventEmitter, Output } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  @Output() idEdit$: EventEmitter<string> = new EventEmitter();

  private URL = 'http://localhost:4000/api/auth';
  private headers:HttpHeaders;
  private emailUser = [];

  constructor(
    private http:HttpClient,
    private router:Router,
    private cookie:CookieService
  ) { }

  getHeader():HttpHeaders{
    this.headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': this.getToken()
    })
    return this.headers
  }

  signUp(user){
    return this.http.post<any>(this.URL+'/signup',user);
    
  }
  signIn(user){
    return this.http.post<any>(this.URL+'/signin',user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }


  logout(){
    localStorage.removeItem('token');
    this.cookie.deleteAll();
    this.router.navigate(['/signin']);
  }

  getCookie(){
    return this.cookie.get('email');
  }

  profile(){
    this.getHeader();
    return this.http.get<any>(this.URL +'/profile',{headers:this.headers});
  }
}
