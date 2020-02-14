import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service'; 
import { Router,ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { StudentDetails } from '../data-models/student-details';
import { NavbarService } from '../../shared/services/navbar.service';

import { PlacementService } from '../../shared/services/placement.service';

@Component({
    selector: 'app-student-dashboard',
    templateUrl: './student-dashboard.component.html',
    styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

    index_number: number;
    student : StudentDetails 
    errorMessage:String;

    hide_company_status: boolean = false;
    hide_sidebar:boolean  = false;


    constructor(
        private authenticationService : AuthenticationService,
        private  router : Router,
        private route: ActivatedRoute,
        private studentService: StudentService,
        public nav:NavbarService,
        private placementService: PlacementService) {}

    ngOnInit() {
        this.nav.hide();

        this.route.params.subscribe(
            params=>{
                this.index_number  = +params['index_number'];
            }
        );

        this.fetchStudentDetails();
        this.checkPlacementStatus();
    }




    hideSidebar():void{
        this.hide_sidebar= !this.hide_sidebar;
    }


    registerCompany():void{
    }

    fetchStudentDetails():void{
        this.studentService.getStudentDetails(this.index_number)
        .subscribe(student => {
        
        this.student= student
        },
            error => this.errorMessage = < any > error);


    }

    checkPlacementStatus():void{


        /**we  are fetching the student details again in this method
         * Because if the student registers his/her company
         * and then the is directed to the 
         * /student/9780113/dashboard/placement-done-student-placed url,
         * we need to call the getStudentDetails again to get the new 
         * changes in the student that has been made.
         */

        this.fetchStudentDetails();

        this.placementService.getPlacementStatus()
        .subscribe( 
            data=> {
                let placement_status = data;

                //placement status being true means placement done 
                if(placement_status === 'true'){

                    if (this.student[0].want_placement == 1){

                        //check if the student has a company.
                        if(this.student[0].company){

                            this.router.navigate(['/student/'+this.index_number+'/dashboard/placement-done-student-placed']);
                        }

                        else{
                            this.router.navigate(['/student/'+this.index_number+'/dashboard/placement-done-student-not-placed']);

                        } 
                    }

                    else{

                        if(this.student[0].company_id == null){
                            this.router.navigate(['/student/'+this.index_number+'/dashboard/student-got-company-already']);
                        }

                        else{

                            this.router.navigate(['/student/'+this.index_number+'/dashboard/placement-done-student-placed']);
                        }


                    }
                }


                else{

                    this.router.navigate(['/student/'+this.index_number+'/dashboard/placement-not-done']);
                }

            },
            error => {
                console.log(error);

            });


    }



    logout():void{
        this.authenticationService.studentLogout();
        this.router.navigate(['/student']);



    }
}
