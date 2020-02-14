import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';


import {environment} from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlacementService {

    api_url = environment.api_url;

  constructor(private http:Http) { };

    

    getPlacementStatus(): Observable<any> {


		let check_placement_status_url = this.api_url + '/placement_status/check';
        return this.http.get(check_placement_status_url)
            .map(this.extractData)
            .catch(this.handleError);




    }
    placeStudents(): Observable<any> {


		let place_student_url= this.api_url + '/admin/placement-students';
        return this.http.get(place_student_url)
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
