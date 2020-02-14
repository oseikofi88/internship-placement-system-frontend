import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {SharedService } from '../../../shared/services/shared.service';
import { StudentDetails} from '../../../student/data-models/student-details';

@Component({
    selector: 'app-departmental-student-details-statistics',
    templateUrl: './departmental-student-details-statistics.component.html',
    styleUrls: ['./departmental-student-details-statistics.component.css']
})
export class DepartmentalStudentDetailsStatisticsComponent {

    student_statistics:StudentDetails[];
    details_type:string;
    errorMessage:String;
    coordinator_id:number;
    sub_department_id:string;

    loading_data: boolean = true;

    students_registered:boolean = true;
    students_that_wanted_placement:boolean = true; 
    students_placed_by_college:boolean = true;
    students_not_placed_by_college:boolean = true;
    students_that_rejected_company:boolean = true;
    students_that_searched_for_own_company:boolean = true;


    constructor(

        private sharedService:SharedService,
        private  router : Router,
        private route: ActivatedRoute,


    ) {


        route.queryParams.forEach(params =>{

    this.students_registered = true;
    this.students_that_wanted_placement = true; 
    this.students_placed_by_college = true;
    this.students_not_placed_by_college = true;
    this.students_that_rejected_company = true;
    this.students_that_searched_for_own_company = true;
            this.loading_data = true

            this.route
                .queryParams
                .subscribe(params => {
                    this.details_type= params['details_type'];
                });

            this.route.params.subscribe(
                params =>{
                    this.sub_department_id = params['sub_department_id'];

                }
            );


            this.route.parent.parent.parent.params.subscribe(

                params=>{
                    this.coordinator_id= +params['coordinator_id'];
                    this.sharedService.getStudentsDetails(this.coordinator_id, this.details_type,this.sub_department_id) 
                        .subscribe(statistics=>
                            {            
                                this.student_statistics = statistics;
                                this.loading_data = false; 
                                this.displayAppropriateTableStatistics();
                            } ,
                            error => this.errorMessage = < any > error);
                }
            );
        })


        route.params.forEach(params =>{

    this.students_registered = true;
    this.students_that_wanted_placement = true; 
    this.students_placed_by_college = true;
    this.students_not_placed_by_college = true;
    this.students_that_rejected_company = true;
    this.students_that_searched_for_own_company = true;
            this.loading_data = true

            this.route
                .queryParams
                .subscribe(params => {
                    this.details_type= params['details_type'];
                });

            this.route.params.subscribe(
                params =>{
                    this.sub_department_id = params['sub_department_id'];

                }
            );


            this.route.parent.parent.parent.params.subscribe(

                params=>{
                    this.coordinator_id= +params['coordinator_id'];
                    this.sharedService.getStudentsDetails(this.coordinator_id, this.details_type,this.sub_department_id) 
                        .subscribe(statistics=>
                            {            
                                this.student_statistics = statistics;
                                this.loading_data = false; 
                                this.displayAppropriateTableStatistics();
                            } ,
                            error => this.errorMessage = < any > error);
                }
            );
        })





    }
displayAppropriateTableStatistics():void{
switch (this.details_type){
    case 'registered':
            this.students_registered  = false;
        break;

    case 'want_placement':
            this.students_that_wanted_placement= false;
        break;

    case 'placed_by_college':
            this.students_placed_by_college= false
        break;

    case 'not_placed_by_college':
            this.students_not_placed_by_college= false;
        break;

    case 'rejected_college_placement':
            this.students_that_rejected_company= false;
        break;

    case 'searched_for_own_company':
            this.students_that_searched_for_own_company= false;
        break;



}
}


}
