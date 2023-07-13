import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AbstractControl, ValidatorFn, ValidationErrors, NG_VALIDATORS} from "@angular/forms";


import {ConnectBDService} from "../../shared/services/connect-bd.service";
import {User} from "../../shared/classes/user";

import {emailValidator} from "./validar-email.directive";
import {passValidator, ValidarPasswordDirective} from "./validar-password.directive";




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    { provide: NG_VALIDATORS, useExisting: ValidarPasswordDirective, multi: true }
  ]

})


export class RegisterComponent implements OnInit{
  constructor(private connectbd : ConnectBDService) { }
  RegisterForm!:FormGroup;
  users:User[]=[];
  message:string='';
  ngOnInit():void {
    this.RegisterForm = new FormGroup({
      nombre: new FormControl("", [Validators.required, Validators.minLength(5)]),
      apellido: new FormControl("", [Validators.required, Validators.minLength(5)]),
      mail : new FormControl("", [Validators.required, Validators.minLength(5),
        Validators.required, Validators.email, emailValidator()]),
      contrasena: new FormControl("", [Validators.required, Validators.minLength(5), passValidator()]),
      //clientes:
      userType:new FormControl('',[Validators.required]),
      telefono: new FormControl('',[Validators.required]),
      direccion:new FormControl('',[Validators.required]),
      codigo_postal:new FormControl('',[Validators.required]),
      //proveedores:
      businessName:new FormControl('',[Validators.required]),
      businessType:new FormControl('',[Validators.required]),
      //repartidores:
      vehiculo:new FormControl('',[Validators.required]),
      vehiculoType:new FormControl('',[Validators.required])
    });
    this.RegisterForm.get('userType')?.valueChanges.subscribe(value => {
      this.resetFields();
      this.updateValidators(value);
    });

  }
  resetFields() {
    this.RegisterForm.patchValue({
      telefono: '',
      direccion: '',
      codigo_postal: '',
      businessName: '',
      businessType: '',
      vehiculo: '',
      vehiculoType: ''
    });
  }

  updateValidators(userType: string) {
    const telefonoControl = this.RegisterForm.get('telefono');
    const direccionControl = this.RegisterForm.get('direccion');
    const codigoPostalControl = this.RegisterForm.get('codigo_postal');
    const businessNameControl = this.RegisterForm.get('businessName');
    const businessTypeControl = this.RegisterForm.get('businessType');
    const vehiculoControl = this.RegisterForm.get('vehiculo');
    const vehiculoTypeControl = this.RegisterForm.get('vehiculoType');

    if (userType === 'cliente' || userType === 'proveedor' || userType === 'repartidor') {
      telefonoControl?.setValidators([Validators.required]);
      direccionControl?.setValidators([Validators.required]);
      codigoPostalControl?.setValidators([Validators.required]);
    }

    if (userType === 'proveedor') {
      businessNameControl?.setValidators([Validators.required]);
      businessTypeControl?.setValidators([Validators.required]);
    }

    if (userType === 'repartidor') {
      vehiculoControl?.setValidators([Validators.required]);
      vehiculoTypeControl?.setValidators([Validators.required]);
    }

    telefonoControl?.updateValueAndValidity();
    direccionControl?.updateValueAndValidity();
    codigoPostalControl?.updateValueAndValidity();
    businessNameControl?.updateValueAndValidity();
    businessTypeControl?.updateValueAndValidity();
    vehiculoControl?.updateValueAndValidity();
    vehiculoTypeControl?.updateValueAndValidity();
  }
  get nombre() {return this.RegisterForm.get('nombre');}
  get apellido () {return this.RegisterForm.get('apellido');}
  get mail () {return this.RegisterForm.get('mail');}
  get contrasena() {return this.RegisterForm.get('contrasena');}


  onSubmit() {
    if (this.RegisterForm.valid) {
      this.connectbd.registroUser(this.RegisterForm.value).subscribe(
          res => {
            if (res.error) {
              this.message = res.message;
            } else if (res && res.data) {
              this.users = res.data;
              this.users.push(...res.data);
              this.message = "¡FELICIDADES!" + this.RegisterForm.get('nombre')?.value + " te has registrado CORRECTAMENTE";
            }
          }, error => {
            this.message = "Error en el registro. Por favor, inténtalo de nuevo más tarde.";
          }
      );
    }
  }
}
