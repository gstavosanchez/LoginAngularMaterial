import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public user = {
    email: '',
    contrasena:''
  }
  //private nav:NavComponent;
  //private nav:NavComponent;
  
  
  constructor(
    private _snackBar:MatSnackBar,
    private authService:AuthService,
    private router:Router,
    private cookie:CookieService

  ) { 
    
  }

  ngOnInit(): void {
  }

  signIn(){
    //console.log(this.user.email)
    //console.log(this.user.contrasena)
    if(this.user.email != '' && this.user.contrasena != ''){
      if(this.user.email.indexOf("@") > -1){
        this.authService.signIn(this.user)
          .subscribe(
            res =>{
              console.log(res);
              localStorage.setItem('token',res.token);
              this.cookie.set("email",this.user.email);
              //console.log(this.cookie.get('email'))
              this.reloadPage()

            },
            err =>{
              console.log(err);
              const respuesta = err.error;
              this.openSnackBar(respuesta,"Error")
            }
          );
      }else{
        this.openSnackBar("Ingrese un email Valido!","Error")
      }
      
    }else{
      this.openSnackBar("Datos Vacios !","Error")
    }
  }

  openSnackBar(message:string,action:string){
    this._snackBar.open(message,action,{
      duration:2500,
    });
  }

  reloadPage(){
    this.router.navigate(['/user']);
    this.openSnackBar("Bienvenido !","Succes")
    
    
  }

}
