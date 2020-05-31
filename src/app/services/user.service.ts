import { Injectable,EventEmitter,Output } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  @Output() public nombre$ = new EventEmitter<string>();///Se dispara un cambio
  



  private URL  = "http://localhost:4000/api";
  private headers:HttpHeaders;

  constructor(
    private http:HttpClient,
    private authService:AuthService
  ) { }

  getHeader():HttpHeaders{
    this.headers = new HttpHeaders({
      'Content-Type':'application/json',
      'token': this.authService.getToken()
    })
    return this.headers
  }

  newUser(user){
    this.getHeader();
    return this.http.post<any>(this.URL +'/user',user,{headers:this.headers});
  }
  
  getUser(){
    this.getHeader();
    return this.http.get<any>(this.URL +'/user',{headers:this.headers});
  }
  getOneUser(id:string){
    console.log("id Ruta:"+id)
    this.getHeader();
    return this.http.get<any>(`${this.URL}/user/${id}`,{headers:this.headers});
  }

  deleteuser(id:string){
    this.getHeader();
    return this.http.delete<any>(`${this.URL}/user/${id}`,{headers:this.headers});
  }

}
