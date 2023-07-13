import { Component } from '@angular/core';
import {ConnectBDService} from "../../shared/services/connect-bd.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {emailValidator} from "../register/validar-email.directive";
import {passValidator} from "../register/validar-password.directive";
import {User} from "../../shared/classes/user";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
//CUIDADO CON ESTE INSTRUCTOR, VA CERRADO Y VACIO
  constructor(private connectbd : ConnectBDService) {}

  loginForm!:FormGroup;
  users:User[]=[];
  message:string='';
  ngOnInit():void{
    this.loginForm=new FormGroup({
      nom :new FormControl("", [Validators.required, Validators.minLength(7),
        Validators.required, Validators.email, emailValidator()]),
      password:new FormControl("", [Validators.required,Validators.minLength(8), passValidator])
    })
  }
  get nom() {return this.loginForm.get('nom');}
  get password() {return this.loginForm.get('password');}

  onSubmit(){
    this.connectbd.loginUser(this.loginForm.value).subscribe(res=>{
      if(res.data.length==0){
        this.users=[];
        this.message="LOGIN INCORRECTO";
      }else{
        this.users = res.data;
        this.message="EL USUARIO" + this.users[0].nom+"se ha logeado CORRECTAMENTE";
      }
    })
  }
}
