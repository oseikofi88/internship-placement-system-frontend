import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { StudentDetails } from  '../../student/data-models/student-details';

@Component({
  selector: 'app-all-students-and-their-companies',
  templateUrl: './all-students-and-their-companies.component.html',
  styleUrls: ['./all-students-and-their-companies.component.css']
})
export class AllStudentsAndTheirCompaniesComponent implements OnInit {
    student_details: StudentDetails[];
	errorMessage:String;
    loading_data: boolean = true;


    



  constructor(private adminService:AdminService) { }



  ngOnInit() {

      this.adminService.getAllStudentsAndCompanyDetails()
        .subscribe(statistics=>
            {            
                this.student_details= statistics;
                this.loading_data =  false;
            } ,
            error => this.errorMessage = < any > error);

  }


}
