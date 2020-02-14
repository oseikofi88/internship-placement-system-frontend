import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService} from '../../company/company.service';
import { StudentDetails } from '../../student/data-models/student-details'

import { CompanyDetails} from '../../company/data-models/company-details';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { SharedService} from '../../shared/services/shared.service';
import { FormBuilder,FormGroup,Validators ,FormArray,FormControl} from '@angular/forms';
import { PlacementService } from '../../shared/services/placement.service';

@Component({
    selector: 'app-students-placed-in-company',
    templateUrl: './students-placed-in-company.component.html',
    styleUrls: ['./students-placed-in-company.component.css']
})
export class StudentsPlacedInCompanyComponent implements OnInit {

    returnUrl :string;
    company_id: number;
    errorMessage:string;
    orderStudentForm:FormGroup;
    order_form:boolean = false;
    students: StudentDetails[];
    list_of_students:boolean = false;


    constructor(private fb:FormBuilder,
        private route: ActivatedRoute,
        private authenticationService : AuthenticationService,
        private companyService: CompanyService,
        private sharedService: SharedService,
        private placementService: PlacementService,
        private router: Router) { }

    ngOnInit() {
        // this.authenticationService.logout();

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.sharedService.getMainDepartments()
            .subscribe(departments => {
            },
                error => this.errorMessage = < any > error);


        this.route.parent.params.subscribe(
            params=>{
                this.company_id= +params['company_id'];
            }
        );


        this.placementService.getPlacementStatus()
            .subscribe(

                data=> {
                    let placement_status = data;
                    if(placement_status === 'true'){
                        this.getStudentsPlaced();
                    }
                    else{
                        this.router.navigate(['/company/'+this.company_id+'/dashboard/placement-not-done']);
                    }
                },
                error => {
                    console.log(error);

                });

    }
    getStudentsPlaced(){
        this.companyService.getStudentsPlacedInCompany(this.company_id)
            .subscribe(students=> { 
                this.students =  students;
                if(this.students.length > 0){
                    this.list_of_students = true ;
                }
            },

                error => this.errorMessage = < any > error);

    }
}
