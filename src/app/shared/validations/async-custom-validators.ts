import {  AbstractControl } from '@angular/forms';
import { AsyncValidationService }  from '../../shared/services/async-custom-validation-service'
import {Injectable} from "@angular/core";

export class AsyncValidator {


//async validator to check if index number is already registered
  static validateIndexNumber(asyncValidationService:AsyncValidationService) {
    return (control:AbstractControl) => {
      return asyncValidationService.checkIfIndexNumberHasAlreadyRegistered(control.value).map(res => {
        return res ? null : {"indexNumberRegistered": true};
      });
    };
  }
}
