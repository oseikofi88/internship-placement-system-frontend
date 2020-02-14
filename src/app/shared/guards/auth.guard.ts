import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';



@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

		if(localStorage.getItem('currentStudentUser')){
		    return true;
		}
        if (localStorage.getItem('currentCompanyUserr')){
        
		    return true;
        }

        if (localStorage.getItem('currentCoordinator')){
        
		    return true;
        }

	this.router.navigate(['/'],{queryParams:
		{	returnUrl: state.url }});
	return false;
}
}
