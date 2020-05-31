import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { SigninComponent } from '../signin/signin.component'
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user = {
    id:'',
    email:'',
  }
  public contador:number;
  public bandera:boolean;
  constructor(
    public authService:AuthService,
    
  ) {
    
    
   }

  ngOnInit(): void {
    //this.isLogued()
    
  }


}
