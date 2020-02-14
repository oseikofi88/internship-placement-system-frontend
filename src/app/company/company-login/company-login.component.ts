import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';

import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { NavbarService } from '../../shared/services/navbar.service';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent implements OnInit {
	model: any={};
    loginForm:FormGroup;
    returnUrl :string;
  
    
    constructor(private fb:FormBuilder,
        private route: ActivatedRoute,
    private authenticationService : AuthenticationService,
		public nav:NavbarService,
    private router: Router) { }

    ngOnInit() {
		this.nav.hide();
      this.loginForm = this.fb.group({
		  company_id: ['', [Validators.required]],
              password:['',[Validators.required]]

      })


        this.authenticationService.companyLogout();

            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}


loginCompany():void{
    if (this.loginForm.valid && this.loginForm.dirty){
	let company_id= 	this.loginForm.get('company_id').value;
	let password =  this.loginForm.get('password').value;
    this.authenticationService.loginCompany(company_id,password)
    .subscribe(
        data=> {
			if (data === true){
            this.router.navigate(['/company/'+company_id+'/dashboard/make-order']);
			}
			else{
				alert('Your id and password do not match. Please use the id and password we sent to your email');

            this.router.navigate(['company/login']);
			this.loginForm.reset();
			}

},
    error => {
		alert('hmmm your request couln\'t be completed');
        console.log(error);

    });

    

}
}
}



