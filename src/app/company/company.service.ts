import { Injectable } from '@angular/core';
import { Http, Response,Headers,RequestOptions,URLSearchParams } from '@angular/http';
import { StudentDetails } from '../student/data-models/student-details'

import { environment } from '../../environments/environment'

import { CompanyDetails} from './data-models/company-details';
import { CompanyRegister} from './data-models/company-registration';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class CompanyService {

    api_url = environment.api_url; 

    constructor(private http: Http) {};



    registerCompany(company_details):Observable<any>{ //company rep registering company

		let company_rep_register_company_url = this.api_url + '/company/register';

        let headers = new Headers();
        // headers.append('enctype', 'multipart/form-data');
        headers.delete('Content-Type');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(company_rep_register_company_url,company_details,options)
        .map(this.extractData)
        ._catch(this.handleError);
	}
    
    getCompanyDetails(company_id): Observable<CompanyDetails>{

    let params:URLSearchParams = new URLSearchParams();
    params.set('company_id', company_id);


    let requestOptions = new RequestOptions();
    requestOptions.search = params;

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

		let get_details_of_company_url = this.api_url + '/company/details';


return      this.http.get(get_details_of_company_url, requestOptions)
        .map(this.extractData)
        ._catch(this.handleError);

  }


    companyMakeOrder(order):Observable<any>{ 
		
		let student_register_company_url = this.api_url + '/company/make-student-order';


        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        return this.http.post(student_register_company_url,order,options)
        .map(this.extractData)
        ._catch(this.handleError);
	}



    getStudentsPlacedInCompany(company_id):Observable<StudentDetails[]>{

    let params:URLSearchParams = new URLSearchParams();
    params.set('company_id', company_id);


    let requestOptions = new RequestOptions();
    requestOptions.search = params;

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

        let students_placed_in_company_details_url = this.api_url + '/company/students-placed-in-company-details'

return      this.http.get(students_placed_in_company_details_url, requestOptions)
        .map(this.extractData)
        ._catch(this.handleError);

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
