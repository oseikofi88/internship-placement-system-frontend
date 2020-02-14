import { AbstractControl,FormGroup,FormControl } from '@angular/forms';

export function validateEmail(control: AbstractControl){
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
        return { "incorrectMailFormat": true };
    }

    return null;

}

    export function checkPasswordMatch(fg: FormGroup){
        let password = fg.controls['password'].value;
        let confirm_password = fg.controls['confirm_password'].value;       
        if(password !== confirm_password){
            return {"passwordMismatch" :true}
        }
        
            return null;
        }



