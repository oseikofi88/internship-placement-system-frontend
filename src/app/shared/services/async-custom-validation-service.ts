import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers, RequestOptions, URLSearchParams} from '@angular/http'; 
import {AbstractControl} from '@angular/forms';

import {environment} from '../../../environments/environment';


@Injectable()
export class AsyncValidationService {

    api_url = environment.api_url;
    
  constructor(private http:Http) {}


  checkIfIndexNumberHasAlreadyRegistered(control:AbstractControl):{[key:string]:any} {

    let params:URLSearchParams = new URLSearchParams();
    params.set('index_number', control.value);

    let requestOptions = new RequestOptions();
    requestOptions.search = params;

    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

        let student_check_url = this.api_url + '/student/check';
          this.http.get(student_check_url, requestOptions)
            .map(this.extractData)
            .subscribe(data => {
              if (data.length == 1) {
                resolve({"duplicate": true})
              }
              else resolve(null);
            })
        });
      }

  checkIfIndexNumberHasNotRegistered(control:AbstractControl):{[key:string]:any} {

    let params:URLSearchParams = new URLSearchParams();
    params.set('index_number', control.value);

    let requestOptions = new RequestOptions();
    requestOptions.search = params;

    return new Promise(resolve => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let student_check_url = this.api_url + '/student/check';
        this.http.get(student_check_url, requestOptions)
            .map(this.extractData)
            .subscribe(data => {
                if (data.length != 1) {
                    resolve({"not_registered": true})
                }
                else resolve(null);
            })
    });
  }

  checkIfEmailExist(control:AbstractControl):{[key:string]:any} {

    let params:URLSearchParams = new URLSearchParams();
    params.set('email', control.value);

    let requestOptions = new RequestOptions();
    requestOptions.search = params;

    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

        let coordinator_check_url = this.api_url + '/coordinator/check';
          this.http.get(coordinator_check_url, requestOptions)
            .map(this.extractData)
            .subscribe(data => {
                if (data.length != 1) {
                    resolve({"not_registered": true})
                }
                else resolve(null);
            })
        });
      }

  checkIfAdminUserNameAlreadyExist(control:AbstractControl):{[key:string]:any} {

    let params:URLSearchParams = new URLSearchParams();
    params.set('username', control.value);

    let requestOptions = new RequestOptions();
    requestOptions.search = params;

    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

        let admin_check_url = this.api_url + '/admin/check';
          this.http.get(admin_check_url, requestOptions)
            .map(this.extractData)
            .subscribe(data => {
                if (data.length == 1) {
                    resolve({"duplicate": true})
                }
                else resolve(null);
            })
        });
      }



    private extractData(response:Response) {
    let body = response.json();
    return body || {};
  }


}


