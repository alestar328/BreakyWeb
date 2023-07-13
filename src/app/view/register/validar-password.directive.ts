import { Directive, Input } from '@angular/core';
import {AbstractControl, ValidatorFn, ValidationErrors, NG_VALIDATORS} from "@angular/forms";
@Directive({
  selector: '[appValidarPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting:ValidarPasswordDirective, multi:true}]
})
export class ValidarPasswordDirective {

  @Input('appName') passwordStrength=false;
  validate(control:AbstractControl):ValidationErrors | null {
    return this.passwordStrength ? passValidator()(control):null;
  }
  constructor() { }
}

export function passValidator(): ValidatorFn {

  const errorMessages = {
    lowerCase: 'Debe incluir al menos una letra minúscula.',
    numeric: 'Debe incluir al menos un número.',
  };

  return (control:AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if(!value){
      return null;
    }
    const hasLowerCase =/[a-z]+/.test(value);
    const hasNumeric =/[0-9]+/.test(value);

    const passwordValid =  hasLowerCase && hasNumeric;
    // return !passwordValid ? {passwordStrength:true}: null;

    const errors: ValidationErrors  = {};
    if (!hasLowerCase) {
      errors['lowerCase'] = errorMessages.lowerCase;
    }
    if (!hasNumeric) {
      errors['numeric'] = errorMessages.numeric;
    }
    return Object.keys(errors).length > 0 ? errors : null;
  };
}
