import { Injectable } from '@angular/core';
import { Http, Response,Headers,RequestOptions,URLSearchParams } from '@angular/http';

import {environment} from '../../environments/environment';

import { MainDepartment } from '../shared/interfaces/main-department';
import { SubDepartment } from '../shared/interfaces/sub-department';
import { StudentRegister } from '../student/data-models/student-registration'
import { StudentPasswordRecovery} from '../student/data-models/student-password-recovery'
import { StudentDetails } from '../student/data-models/student-details'
import { StudentSupervisorUpdate} from '../student/data-models/student-supervisor-details-update'
import { LocationInterface,LocationClass } from '../shared/interfaces/location'


import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class StudentService {

    api_url = environment.api_url;

    constructor(private http: Http) {};


    registerStudent(student: StudentRegister): Observable<any>{
		
		let register_student_url = this.api_url + '/student/register';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(register_student_url,student,options)
        .map(this.extractData)
        ._catch(this.handleError);
	}

    updateStudentDetails(student: StudentRegister): Observable<any>{
		
		let update_student_details_url = this.api_url + '/student/update-details';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(update_student_details_url,student,options)
        .map(this.extractData)
        ._catch(this.handleError);
	}


    updateSupervisorDetails(student: StudentSupervisorUpdate): Observable<StudentRegister>{
	
		let update_supervisor_details_url = this.api_url + '/student/update-supervisor-details';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(update_supervisor_details_url,student,options)
        .map(this.extractData)
        ._catch(this.handleError);
	}

      getStudentDetails(index_number):Observable<StudentDetails> {

        let params:URLSearchParams = new URLSearchParams();
        params.set('index_number', index_number);
        let requestOptions = new RequestOptions();
        requestOptions.search = params;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let student_check_url = this.api_url + '/student/check';

        return  this.http.get(student_check_url, requestOptions)
        .map(this.extractData)
        ._catch(this.handleError);


  }
        registerTimeStudentStartedInternship(index_number):Observable<any>{

        let params:URLSearchParams = new URLSearchParams();
        params.set('index_number', index_number);
        let requestOptions = new RequestOptions();
        requestOptions.search = params;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

		let student_started_internship_url = this.api_url + '/student/started-internship';
        return  this.http.get(student_started_internship_url,requestOptions)
        .map(this.extractData)
        ._catch(this.handleError);

        }


    uploadAcceptanceLetter(acceptance_letter):Observable<any>{
		
		let upload_acceptance_letter_url = this.api_url + '/student/upload-acceptance-letter';
        let headers = new Headers();
        headers.delete('Content-Type');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(upload_acceptance_letter_url,acceptance_letter,options)
        .map(this.extractData)
        ._catch(this.handleError);
	}
    
    studentRegisterCompany(company):Observable<any>{ 
		
		let student_register_company_url = this.api_url + '/student/company/register';
        let headers = new Headers();
        headers.delete('Content-Type');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(student_register_company_url,company,options)
        .map(this.extractData)
        ._catch(this.handleError);
	}

    studentMakeOrder(order):Observable<any>{ 
		
		let student_register_company_url = this.api_url + '/student/company/make-order';


        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        return this.http.post(student_register_company_url,order,options)
        .map(this.extractData)
        ._catch(this.handleError);
	}

    sendPasswordRecoveryLinkToEmail(email):Observable<any>{
		let student_send_email_link= this.api_url + '/student/send-password-reset-link';


        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        return this.http.post(student_send_email_link,JSON.stringify({ email: email}) ,options)
        .map(this.extractData)
        ._catch(this.handleError);
    
    }

    studentResetPassword(recoveryDetails: StudentPasswordRecovery):Observable<any>{
		let student_reset_password = this.api_url + '/student/reset-password';


        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        return this.http.post(student_reset_password,recoveryDetails,options)
        .map(this.extractData)
        ._catch(this.handleError);
    
    }

    rejectPlacement(index_number, reason_for_rejection):Observable<any>{
        let student_company_rejection_url = this.api_url + '/student/reject-placement';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    

    return this.http.post(student_company_rejection_url,JSON.stringify({ index_number: index_number, reason_for_rejection : reason_for_rejection}),options)
    .map(this.extractData)
    .catch(this.handleError);
    }


        private extractData(response: Response) {
            let body = response.json();
            return body || {};
        }

        private handleError(error: Response): Observable < any > {

            console.error(error)
            return Observable.throw(error.json().error || 'Server error')
        }

}
