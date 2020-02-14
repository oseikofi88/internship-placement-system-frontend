import { Injectable } from '@angular/core';
import { Http, Response,Headers,RequestOptions,URLSearchParams } from '@angular/http';

import {environment} from '../../../environments/environment';

import { MainDepartment } from '../interfaces/main-department';
import { SubDepartment } from '../interfaces/sub-department';
import { GeneralStudentStatistics} from '../interfaces/general-student-statistics';
import { GeneralStudentGraphStatistics} from '../interfaces/general-student-graph-statistics';
import { GeneralCompanyGraphStatistics} from '../interfaces/general-company-graph-statistics';
import { StudentDetails} from '../../student/data-models/student-details'
import { CompanyDetails } from  '../../company/data-models/company-details';

import { GeneralCompanyStatistics } from '../interfaces/general-company-statistics';
import { DepartmentalCompanyStatistics} from '../interfaces/departmental-company-statistics';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class SharedService {

    api_url = environment.api_url;

    constructor(private http: Http) {};

    getMainDepartments(): Observable < MainDepartment[] > { 
		let department_url = this.api_url + '/main-department/all';
        return this.http.get(department_url)
            .map(this.extractData)
            .catch(this.handleError);
}


    getSubDepartments(): Observable <SubDepartment[]> {
        let sub_department_url = this.api_url + '/sub-department/all';
    return this.http.get(sub_department_url)
    .map(this.extractData)
    .do(data => console.log('getSubDepartments' + JSON.stringify(data)))
    .catch(this.handleError); 
}

fileConcernToCoordinator(concern):Observable<any>{

		let file_concern_url = this.api_url + '/file-concern';
        return this.http.post(file_concern_url, concern)
            .map(this.extractData)
            .catch(this.handleError);


}

getPlacementStatus():Observable<any>{

		let placement_status_url = this.api_url + '/placement-status';

        return this.http.get(placement_status_url)
            .map(this.extractData)
            .catch(this.handleError);

}
getGeneralStudentStatistics():Observable<GeneralStudentStatistics[]>{
        let general_student_statistics_url = this.api_url + '/general-student-statistics';
    return this.http.get(general_student_statistics_url)
    .map(this.extractData)
    .catch(this.handleError); 

}


getGeneralCompanyStatistics():Observable<GeneralCompanyStatistics[]>{
        let general_company_statistics_url = this.api_url + '/general-company-statistics';
    return this.http.get(general_company_statistics_url)
    .map(this.extractData)
    .catch(this.handleError); 

}
getGeneralStudentGraphStatistics():Observable<GeneralStudentGraphStatistics[]>{
        let general_student_graph_statistics_url = this.api_url + '/general-student-graph-statistics';
    return this.http.get(general_student_graph_statistics_url)
    .map(this.extractData)
    .catch(this.handleError); 

}

getDepartmentalStudentGraphStatistics(coordinator_id):Observable<GeneralStudentGraphStatistics[]>{

        let params:URLSearchParams = new URLSearchParams();
        params.set('coordinator_id', coordinator_id);
        let requestOptions = new RequestOptions();
        requestOptions.search = params;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let departmental_student_graph_statistics_url = this.api_url + '/departmental-student-graph-statistics';

        return  this.http.get(departmental_student_graph_statistics_url, requestOptions)
        .map(this.extractData)
        ._catch(this.handleError);

}

getGeneralCompanyGraphStatistics():Observable<GeneralCompanyGraphStatistics[]>{
        let general_company_graph_statistics_url = this.api_url + '/general-company-graph-statistics';
    return this.http.get(general_company_graph_statistics_url)
    .map(this.extractData)
    .catch(this.handleError); 

}

getDepartmentalCompanyGraphStatistics(coordinator_id):Observable<GeneralCompanyGraphStatistics[]>{

        let params:URLSearchParams = new URLSearchParams();
        params.set('coordinator_id', coordinator_id);
        let requestOptions = new RequestOptions();
        requestOptions.search = params;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let departmental_company_graph_statistics_url = this.api_url + '/departmental-company-graph-statistics';

        return  this.http.get(departmental_company_graph_statistics_url, requestOptions)
        .map(this.extractData)
        ._catch(this.handleError);
}

getDepartmentalStudentStatistics(coordinator_id):Observable<GeneralStudentStatistics[]>{

        let departmental_student_statistics_url = this.api_url + '/departmental-student-statistics';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    

    return this.http.post(departmental_student_statistics_url,JSON.stringify({ coordinator_id: coordinator_id}),options)
    .map(this.extractData)
    .catch(this.handleError); 

}


getStudentsDetails(coordinator_id,details_type,sub_department_id):Observable<StudentDetails[]>{

        let departmental_students_details_statistics_url = this.api_url + '/departmental-students-statistics/details';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    

    return this.http.post(departmental_students_details_statistics_url,JSON.stringify({ coordinator_id: coordinator_id,details_type,sub_department_id:sub_department_id}),options)
    .map(this.extractData)
    .catch(this.handleError); 

}
getDetailsRequested(coordinator_id,details_type,company_id):Observable<any[]>{

        let departmental_companys_details_statistics_url = this.api_url + '/departmental-company-statistics/details';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    

    return this.http.post(departmental_companys_details_statistics_url,JSON.stringify({ coordinator_id: coordinator_id,details_type,company_id:company_id}),options)
    .map(this.extractData)
    .catch(this.handleError); 

}



getDepartmentalCompanyStatistics(coordinator_id):Observable<DepartmentalCompanyStatistics[]>{

        let departmental_company_statistics_url = this.api_url + '/departmental-company-statistics';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    

    return this.http.post(departmental_company_statistics_url,JSON.stringify({ coordinator_id: coordinator_id}),options)
    .map(this.extractData)
    .catch(this.handleError); 

}
getCompaniesInCoordinatorDepartment(coordinator_id):Observable<CompanyDetails[]>{


        let params:URLSearchParams = new URLSearchParams();
        params.set('coordinator_id', coordinator_id);
        let requestOptions = new RequestOptions();
        requestOptions.search = params;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let companies_in_coordinator_department = this.api_url + '/company/all-companies-in-coordinator-department';

        return  this.http.get(companies_in_coordinator_department, requestOptions)
        .map(this.extractData)
        ._catch(this.handleError);
    

}
placeStudentsInCompany(company_id,students):Observable<any>{


        let place_student_in_company_url = this.api_url + '/place-students-in-company';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

    

    return this.http.post(place_student_in_company_url,JSON.stringify({ company_id: company_id,students:students}),options)
    .map(this.extractData)
    .catch(this.handleError); 

}

    registerCompany(company_details):Observable<any>{ 

		let coordinator_register_company = this.api_url + '/admin/register-company';

        let headers = new Headers();
        headers.delete('Content-Type');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(coordinator_register_company,company_details,options)
        .map(this.extractData)
        ._catch(this.handleError);
	}
    

    registerCompanyAndMakeOrder(company_details):Observable<any>{ 

		let coordinator_register_company = this.api_url + '/admin/register-company-and-make-order';

        let headers = new Headers();
        headers.delete('Content-Type');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(coordinator_register_company,company_details,options)
        .map(this.extractData)
        ._catch(this.handleError);
	}
    

rejectStudentsPlacedInCompany(students):Observable<any>{
        
		let reject_student_placement= this.api_url + '/admin/reject-student-placement';

        // headers.append('enctype', 'multipart/form-data');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(reject_student_placement,JSON.stringify({ students: students}),options)
        .map(this.extractData)
        ._catch(this.handleError);
	}

    coordinatorMakeOrder(order):Observable<any>{ 
		
		let student_register_company_url = this.api_url + '/admin/company/make-order';


        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        return this.http.post(student_register_company_url,order,options)
        .map(this.extractData)
        ._catch(this.handleError);
	}

getAllCompaniesRegistered():Observable<any>{ 
		
		let all_companies_registered = this.api_url + '/company/all';


        return this.http.get(all_companies_registered)
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
