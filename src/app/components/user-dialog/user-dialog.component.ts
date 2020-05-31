import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from '../../services/user.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit,OnDestroy {

  subcription:Subscription;
  user = {
    idUsuario:0,
    nombre:'',
    apellido:'',
    email:'',
    contrasena:''
  }
  constructor(
    public dialogRef:MatDialogRef<UserDialogComponent>,
    private userService:UserService,
    private _snackBar:MatSnackBar,
    private authService:AuthService
    //private userComponent:UserComponent
  ) {}
  
  ngOnInit(): void {
    this.triggerEditUser();
  }
  save(){
    if (this.user.nombre != '' && this.user.apellido != ''
        && this.user.email != '' && this.user.contrasena != '') {
          this.userService.newUser(this.user)
            .subscribe(
              res =>{
                console.log(res);
                this.dialogRef.close();
                //this.userComponent.ngOnInit();
                this.openSnackBar(res,"Save");
                this.trigger();
                
              },
              err =>{
                console.log(err);
                this.openSnackBar(err.error,"Error");
              }
            );
      
    }else{
      this.openSnackBar("Datos Vacios !","Error");
    }
  }

  close(){
    this.dialogRef.close();
  }

  openSnackBar(message:string,action:string){
    this._snackBar.open(message,action,{
      duration:2500,
    });
  }

  trigger(){
    this.userService.nombre$.emit('Cambio');
  }

  triggerEditUser(){
    this.subcription = this.authService.idEdit$
      .subscribe(
        res =>{
          console.log(res);
        },
        err =>{
          console.log(err);
        }
      );
  }
  getOneUser(id:string){
    this.userService.getOneUser(id)
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

  ngOnDestroy(): void {
    console.log('ngOnDistroy')
    this.subcription.unsubscribe();
  }

}
