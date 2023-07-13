import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './shared/menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './view/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RegisterComponent } from './view/register/register.component';
import { ValidarEmailDirective } from './view/register/validar-email.directive';
import { ValidarPasswordDirective } from './view/register/validar-password.directive';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './view/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent,
    ValidarEmailDirective,
    ValidarPasswordDirective,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
