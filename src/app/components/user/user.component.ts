import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service'

export interface IUser  {
  idUsuario:string,
  nombre:string,
  apellido:string,
  email:string,
  contrasena:string,
  fecha_Creacion:string

}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnDestroy {

  displayedColumns: string[] = ['idUsuario','nombre','apellido','email','actions'];
  
  nombreSuscription:Subscription;
  
  listadoUsuarios:any = []
  listUsers;
  filterPost = '';
  searchKey:string;
  
  
  constructor(
    private userService:UserService,
    private dialog:MatDialog,
    private _snackBar:MatSnackBar,
    private authSevices:AuthService
    
  ) {}
  
  ngOnInit(): void {
    //console.log('hola')
    this.getUsers()
    this.trigger();
  }

  getUsers():void{
    this.userService.getUser()
      .subscribe(
        res =>{
          this.listadoUsuarios = res as IUser;
          this.listUsers = new MatTableDataSource(this.listadoUsuarios);
          console.log(this.listUsers);

        }
      );
  }

  deleteUser(id:string){
    this.userService.deleteuser(id)
      .subscribe(
        res =>{
          this.getUsers();
          console.log(res);
          //this.bandera= true;
          //this.respuesta = res.message;
          this.openSnackBar(res.message,"Succes");
        },
        err => {
          console.log(err);
          
        }
      );
  }

  limpiar(){
    this.searchKey='';
    this.filtrar();
  }
  filtrar(){
    this.listUsers.filter = this.searchKey.trim().toLowerCase();

  }
  openSnackBar(message:string,action:string){
    this._snackBar.open(message,action,{
      duration:2500,
    });
  }

  newUser(){
    //console.log('hola')
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    //dialogConfig.height="70%"
    this.dialog.open(UserDialogComponent,dialogConfig);
    
  }

  editUser(id:string){
    
    console.log(id);

    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "40%";
    // this.dialog.open(UserDialogComponent,dialogConfig);
    this.authSevices.idEdit$.emit('Hola');
  
  }

  trigger(){
    this.nombreSuscription = this.userService.nombre$.subscribe(texto =>{
      console.log(`Cambio disparado: ${texto}`);
      this.getUsers();
    });
  }

  ngOnDestroy(){
    console.log('ngOnDistroy')
    this.nombreSuscription.unsubscribe();
  }

}
