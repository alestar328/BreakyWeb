import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from './view/home/home.component';
import {RegisterComponent} from "./view/register/register.component";
import {LoginComponent} from "./view/login/login.component";

  //Const Routes: añadido manualmente
const routes : Routes =[
  //Agregacion de rutas (nombre publico del path, nombre del componente a enlazar:
  {path:'', component:HomeComponent},
  {path:'Register', component:RegisterComponent},
  {path:'Login', component:LoginComponent}
];

@NgModule({
  declarations: [],
  //Exports: añadido manualmente
  exports:[RouterModule],
  imports: [
    CommonModule,
    //RouterModule abajo: añadido manualmente
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
