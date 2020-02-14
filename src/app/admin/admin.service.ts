import { Injectable } from '@angular/core';
import { Http, Response,Headers,RequestOptions,URLSearchParams } from '@angular/http';

import {environment} from '../../environments/environment';

import { MainDepartment } from '../shared/interfaces/main-department';
import { SubDepartment } from '../shared/interfaces/sub-department';
import { GeneralStudentStatistics} from '../shared/interfaces/general-student-statistics';
import { GeneralStudentGraphStatistics} from '../shared/interfaces/general-student-graph-statistics';
import { GeneralCompanyGraphStatistics} from '../shared/interfaces/general-company-graph-statistics';
import { StudentDetails} from '../student/data-models/student-details'
import { CompanyDetails } from  '../company/data-models/company-details';
import { CoordinatorDetails } from '../admin/data-models/coordinator-details';

import { GeneralCompanyStatistics } from '../shared/interfaces/general-company-statistics';
import { DepartmentalCompanyStatistics} from '../shared/interfaces/departmental-company-statistics';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class AdminService {

    api_url = environment.api_url;

    constructor(private http: Http) {};

getDepartmentalStudentStatistics(admin_id):Observable<GeneralStudentStatistics[]>{

        let departmental_student_statistics_url = this.api_url + '/departmental-student-statistics';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    
//not the best code , refactor!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return this.http.post(departmental_student_statistics_url,JSON.stringify({ admin_id: admin_id}),options)
    .map(this.extractData)
    .catch(this.handleError); 

}


getDepartmentalCompanyStatistics(admin_id):Observable<DepartmentalCompanyStatistics[]>{

        let departmental_company_statistics_url = this.api_url + '/departmental-company-statistics';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    

    return this.http.post(departmental_company_statistics_url,JSON.stringify({ admin_id: admin_id}),options)
    .map(this.extractData)
    .catch(this.handleError); 

}

getDetailsRequested(admin_id,details_type,company_id):Observable<any[]>{

        let departmental_companys_details_statistics_url = this.api_url + '/departmental-company-statistics/details';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    

    return this.http.post(departmental_companys_details_statistics_url,JSON.stringify({ admin_id: admin_id,details_type,company_id:company_id}),options)
    .map(this.extractData)
    .catch(this.handleError); 

}

getAllCoordinators():Observable<CoordinatorDetails[]>{


		let all_coordinator_url = this.api_url + '/coordinator/all';
        return this.http.get(all_coordinator_url)
            .map(this.extractData)
            .catch(this.handleError);
}

replaceCoordinator(coordinator_id,coordinator_email,coordinator_password):Observable<any>{

        let replace_coordinator_url = this.api_url + '/coordinator/replace';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    

    return this.http.post(replace_coordinator_url,JSON.stringify({ coordinator_id: coordinator_id,coordinator_email: coordinator_email,coordinator_password:coordinator_password}),options)
    .map(this.extractData)
    .catch(this.handleError); 

}

addNewAdmin(admin_username,admin_password):Observable<any>{

        let replace_coordinator_url = this.api_url + '/admin/add-new-admin';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    

    return this.http.post(replace_coordinator_url,JSON.stringify({ admin_username: admin_username,admin_password: admin_password}),options)
    .map(this.extractData)
    .catch(this.handleError); 

}


undoStudentPlacement():Observable<any>{


		let undo_student_placement_url = this.api_url + '/admin/undo-placement';
        return this.http.get(undo_student_placement_url)
            .map(this.extractData)
            .catch(this.handleError);
}
getAllStudentsAndCompanyDetails():Observable<StudentDetails[]> {
		let all_student_and_company_details = this.api_url + '/admin/all-students-and-company-details';
        return this.http.get(all_student_and_company_details)
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
