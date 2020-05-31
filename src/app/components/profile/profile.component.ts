import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  user = {
    idUsuario:0,
    nombre:'',
    apellido:'',
    email:'',
    contrasena:''
  }

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.loadUser()
  }

  loadUser(){
    this.authService.profile()
      .subscribe(
        res =>{
          console.log(res);
          this.user.idUsuario = res.idUsuario;
          this.user.nombre = res.nombre;
          this.user.apellido = res.apellido;
          this.user.email = res.email;
        },
        err =>{
          console.log(err)
        }
      );
  }
  save(){}

  
}
