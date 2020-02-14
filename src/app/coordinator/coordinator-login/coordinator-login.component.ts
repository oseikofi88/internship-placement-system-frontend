import { Component, OnInit,HostListener } from '@angular/core';
import { NavbarService } from '../../shared/services/navbar.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

import { validateEmail} from '../../shared/validations/sync-custom-validators'
import { Router, ActivatedRoute } from '@angular/router';
import { AsyncValidationService }  from '../../shared/services/async-custom-validation-service'

import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-coordinator-login',
  templateUrl: './coordinator-login.component.html',
  styleUrls: ['./coordinator-login.component.css']
})
export class CoordinatorLoginComponent implements OnInit {

 @HostListener('window:popstate', ['$event'])
  onPopState(event) {
      this.nav.show();
  }
    loginForm:FormGroup;
    returnUrl :string;
    incorrect_credentials_alert = true;
    show_reset_password_form:boolean = false;

    logging_in:boolean= true;


	errorMessage:String;
    
    constructor(private fb:FormBuilder,
        private route: ActivatedRoute,public nav: NavbarService, 
        private authenticationService : AuthenticationService,
        private asyncValidationService: AsyncValidationService,
        private router: Router) { }

    ngOnInit() {
        this.nav.hide();

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
{
    alert("We have realised you are using a mobile/tablet device to access the site.Please be aware that the site is not optimized for such devices.For the best user experience , we advice you use your PC's Chrome browser if you experience any issues")
}

      
        this.loginForm = this.fb.group({
			email: ['', [Validators.required, validateEmail],this.asyncValidationService.checkIfEmailExist.
                bind(this.asyncValidationService)],
          password:['',[Validators.required]]

      })


}

loginCoordinator(){

	let email= 	this.loginForm.get('email').value;
	let password =  this.loginForm.get('password').value;
        this.logging_in = !this.logging_in;
    this.authenticationService.loginCoordinator(email,password)
    .subscribe(
        response=> {
                if (response.operation_successful == true){
                
            this.router.navigate(['/coordinator/'+response.coordinator_id+'/dashboard/general-number-statistics']);
			}
			else{
                this.incorrect_credentials_alert = false;			
        this.logging_in = !this.logging_in;

            this.router.navigate(['/coordinator']);
			this.loginForm.patchValue({password:''});
			}

},
    error => {
		alert('hmmm your request couln\'t be completed');
        console.log(error);

    });

}
}
