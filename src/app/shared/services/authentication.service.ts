import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';


import {environment} from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class AuthenticationService {

    api_url = environment.api_url;

    public token:string;

  constructor(private http: Http) { 

      // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      // this.token = currentUser && currentUser.token;
}

    loginStudent(index_number: string, password: string): Observable<boolean>{

        let student_login_url = this.api_url + '/student/login';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    

        return this.http.post(student_login_url,JSON.stringify({ index_number: index_number, password: password }),options)
        .map((response: Response) =>{
            let token =  response.json() && response.json().token;
            if(token){
                this.token = token;
                localStorage.setItem('currentStudentUser',JSON.stringify({index_number: index_number, token: token}));
            return true; 
        }
            else{
                return false;
            }

        })
        ._catch(this.handleError);

}
    loginCompany(company_id: string, password: string): Observable<boolean>{

        let company_login_url = this.api_url + '/company/login';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    

        return this.http.post(company_login_url,JSON.stringify({ company_id: company_id, password: password }),options)
        .map((response: Response) =>{
            let token =  response.json() && response.json().token;
            if(token){
                this.token = token;
                localStorage.setItem('currentCompanyUserr',JSON.stringify({company_id: company_id, token: token}));
            return true; 
        }
            else{
                return false;
            }

        })
        ._catch(this.handleError);

}

    loginCoordinator(email: string, password: string): Observable<any>{

        let coordinator_login_url = this.api_url + '/coordinator/login';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    

        return this.http.post(coordinator_login_url,JSON.stringify({ email: email, password: password }),options)
        .map((response: Response) =>{
            let token =  response.json() && response.json().token;
                this.token = token;
                localStorage.setItem('currentCoordinator',JSON.stringify({coordinator_email: email, token: token}));
            return response.json(); 

        })
        ._catch(this.handleError);

}

    loginAdmin(admin_username: string, admin_password: string): Observable<boolean>{

        let admin_login_url = this.api_url  + '/admin/login';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    

        return this.http.post(admin_login_url,JSON.stringify({ admin_username: admin_username, admin_password: admin_password }),options)
        .map((response: Response) =>{
            let token =  response.json() && response.json().token;
            if(token){
                this.token = token;
                localStorage.setItem('currentAdminUser',JSON.stringify({admin_username: admin_username, token: token}));
            return true; 
        }
            else{
                return false;
            }

        })
        ._catch(this.handleError);

}




    private handleError(error: Response): Observable < any > {

        return Observable.throw(error.json().error || 'Server error')
    }

studentLogout (){
    localStorage.removeItem('currentStudentUser');
}
companyLogout (){
    localStorage.removeItem('currentCompanyUser');
}
adminLogout (){
    localStorage.removeItem('currentAdminUser');
}

coordinatorLogout(){
    localStorage.removeItem('currentCoordinator')
}
}
