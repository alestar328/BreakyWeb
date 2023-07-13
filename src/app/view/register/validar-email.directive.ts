import { Directive, Input } from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn, NG_VALIDATORS} from "@angular/forms";

@Directive({
  selector: '[appValidarEmail]',
  providers: [{provide: NG_VALIDATORS, useExisting:ValidarEmailDirective, multi:true}]

})
export class ValidarEmailDirective {

  @Input('appName') invalidEmail =false;

  validate (control:AbstractControl):ValidationErrors | null {
    return this.invalidEmail ? emailValidator() (control):null;
  }
  constructor() { }

}
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(value)) {
      return { invalidEmail: true };
    }
    return null;
  };
}
