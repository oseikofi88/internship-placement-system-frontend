import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { validateEmail,checkPasswordMatch } from '../../shared/validations/sync-custom-validators'
import { AsyncValidationService }  from '../../shared/services/async-custom-validation-service'
import {StudentService} from '../student.service';
import { StudentPasswordRecovery} from '../../student/data-models/student-password-recovery'
import {SharedService } from '../../shared/services/shared.service';
import { NavbarService } from '../../shared/services/navbar.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

	model: any={};
    passwordResetForm:FormGroup;
    returnUrl :string;
    incorrect_credentials_alert = true;
    studentPasswordRecovery: StudentPasswordRecovery;
    encrypted_key: string;

	errorMessage:String;
	constructor(
        private fb:FormBuilder,
		private studentService:StudentService,
        private sharedService:SharedService,
		private asyncValidationService:AsyncValidationService,
    private route: ActivatedRoute,
		private router: Router,
		public navigation_bar:NavbarService) {}



  ngOnInit() {

        this.route.params.subscribe(
            params=>{
                this.encrypted_key= params['encrypted_key'];
            }
        );
      this.navigation_bar.hide();


        this.passwordResetForm= this.fb.group({
            index_number: ['', [Validators.required,
            Validators.minLength(7),Validators.maxLength(7)],this.asyncValidationService.checkIfIndexNumberHasNotRegistered.
                bind(this.asyncValidationService)],
            encrypted_key:[''],
			passwords: this.fb.group({
				password: ['', [Validators.required, Validators.minLength(5)]],
				confirm_password: ['', Validators.required],
			}, {
				validator: checkPasswordMatch
			}),

      })

  }
resetPassword():void{
    if(this.passwordResetForm.dirty && this.passwordResetForm.valid){
        this.passwordResetForm.patchValue({encrypted_key:this.encrypted_key})
            let recoveryDetails = Object.assign({},this.studentPasswordRecovery, this.passwordResetForm.value);
			this.studentService.studentResetPassword(recoveryDetails)
				.subscribe(
                    response => {
			if (response.operation_successful === true){
					this.passwordResetSuccessful();
            }
                        else{
                        alert("Your update was not successful, please use the link sent to your email")
                        }
                    },

					(error:any) => this.errorMessage = < any > error);

		}
		}

    passwordResetSuccessful():void{
        alert("Your Password Change Was Successful, Please Log In With Your New Password")
		this.router.navigate(['/student/login']);

    }

        


}
