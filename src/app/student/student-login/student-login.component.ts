import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../shared/services/navbar.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

import { validateEmail,checkPasswordMatch } from '../../shared/validations/sync-custom-validators'
import { Router, ActivatedRoute } from '@angular/router';
import { AsyncValidationService }  from '../../shared/services/async-custom-validation-service'


import {StudentService} from '../student.service';

import { FormBuilder,FormGroup,Validators } from '@angular/forms';






@Component({
  selector   : 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
	model: any={};
    loginForm:FormGroup;
    returnUrl :string;
    incorrect_credentials_alert = true;
    show_reset_password_form:boolean = false;
    sending_email:boolean=false;

    logging_in:boolean= true;


	errorMessage:String;
    
    constructor(private fb:FormBuilder,
        private route: ActivatedRoute,public nav: NavbarService, 
        private authenticationService : AuthenticationService,
        private asyncValidationService: AsyncValidationService,
        private studentService:StudentService,
        private router: Router) { }

    ngOnInit() {
        this.nav.hide();

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
{
    alert("We have realised you are using a mobile/tablet device to access the site.Please be aware that the site is not optimized for such devices.For the best user experience , we advice you use your PC's Chrome browser if you experience any issues")
}

      
        this.loginForm = this.fb.group({
            index_number: ['', [Validators.required,
            Validators.minLength(7),Validators.maxLength(7)],this.asyncValidationService.checkIfIndexNumberHasNotRegistered.
                bind(this.asyncValidationService)],
          password:['',[Validators.required]],
			email: ['', [Validators.required, validateEmail]],

      })


        this.authenticationService.studentLogout();

            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}


loginStudent():void{
    if (this.loginForm.get('index_number').valid && this.loginForm.get('password').valid ){
	let index_number= 	this.loginForm.get('index_number').value;
	let password =  this.loginForm.get('password').value;
        this.logging_in = !this.logging_in;
    this.authenticationService.loginStudent(index_number,password)
    .subscribe(
        data=> {
			if (data === true){
            this.router.navigate(['/student/'+index_number+'/dashboard']);
			}
			else{
                this.incorrect_credentials_alert = false;			
        this.logging_in = !this.logging_in;

            this.router.navigate(['student/login']);
			this.loginForm.reset();
			}

},
    error => {
		alert('hmmm your request couldn\'t be completed');
        console.log(error);

    });

    

}
}
forgotPassword():void{
    this.show_reset_password_form = !this.show_reset_password_form;
}

back():void{

    this.show_reset_password_form = !this.show_reset_password_form;
}
resetPassword():void{
    if (this.loginForm.get('email').valid ){
	let email= 	this.loginForm.get('email').value;

                    this.sending_email = !this.sending_email;
			this.studentService.sendPasswordRecoveryLinkToEmail(email)
				.subscribe(
                    response => {
			if (response.operation_successful === true){
                    this.sending_email = !this.sending_email;
                this.show_reset_password_form = !this.show_reset_password_form;
					this.passwordRecoveryRequestSent();
            }
                        else{
                    this.sending_email = !this.sending_email;
                this.show_reset_password_form = !this.show_reset_password_form;
                        alert("Hmmm, the email you entered is not what you registered with, Please contact admin if you can't remember your email");
                        }
		this.router.navigate(['/student/login']);
		this.loginForm.reset();
                    },


                    (error:any) => {
                            alert("Sorry your request couldn\'t be completed due to an error.Please try again later ");
                            window.location.reload();
                    
                   this.errorMessage = < any > error});

		}
		}


	
					passwordRecoveryRequestSent():void{
                    
		alert("A recovery link has been sent to your mail, Please check");

		this.router.navigate(['/student/login']);

		this.loginForm.reset();

	}


}




