import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexComponent } from './components/index/index.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';
import { NavComponent } from './components/nav/nav.component';

import { MaterialModuel } from './material.module';
import { FilterUserPipe } from './pipes/filter-user.pipe';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './components/profile/profile.component'
import { CookieService } from 'ngx-cookie-service';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SigninComponent,
    SignupComponent,
    UserComponent,
    NavComponent,
    FilterUserPipe,
    ProfileComponent,
    UserDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuel,
    FormsModule,
    HttpClientModule
    
    
  ],
  providers: [
    AuthGuard,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
