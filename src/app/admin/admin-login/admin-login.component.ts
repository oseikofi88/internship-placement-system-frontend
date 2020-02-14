import { Component, OnInit ,HostListener} from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { NavbarService } from '../../shared/services/navbar.service';

import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {


 @HostListener('window:popstate', ['$event'])
  onPopState(event) {
      this.nav.show();
  }

	model: any={};
    loginForm:FormGroup;
    returnUrl :string;
    logging_in:boolean = false;
  
    
    constructor(private fb:FormBuilder,
        private route: ActivatedRoute,public nav: NavbarService, 
    private authenticationService : AuthenticationService,
    private router: Router) { }

    ngOnInit() {
        this.nav.hide();

      
      this.loginForm = this.fb.group({
		  admin_username: ['', [Validators.required]],
              password:['',[Validators.required]]

      })


        this.authenticationService.adminLogout();

            this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}


loginAdmin():void{
    if (this.loginForm.valid && this.loginForm.dirty){
        this.logging_in = true;
	let admin_username= 	this.loginForm.get('admin_username').value;
	let admin_password =  this.loginForm.get('password').value;
    this.authenticationService.loginAdmin(admin_username,admin_password)
    .subscribe(
        data=> {
			if (data === true){
        this.logging_in = false;
            this.router.navigate(['/admin/'+admin_username+'/dashboard/number-statistics']);
			}
			else{
				alert('your username or password is incorrect');
        this.logging_in = false;

            this.router.navigate(['admin/login']);
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



