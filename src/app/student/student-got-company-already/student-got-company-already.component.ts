import { Component, OnInit ,Input,Inject } from '@angular/core';
import { StudentDetails } from '../../student/data-models/student-details';
import { StudentService} from '../student.service'
import { Router,ActivatedRoute } from '@angular/router';
import * as html2canvas from "html2canvas";
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-student-got-company-already',
  templateUrl: './student-got-company-already.component.html',
  styleUrls: ['./student-got-company-already.component.css']
})
export class StudentGotCompanyAlreadyComponent implements OnInit {
index_number: number;
student : StudentDetails 
errorMessage:string;
full_date:any;
year:any;


  constructor(
  private studentService: StudentService,
   private  router : Router,
  private route: ActivatedRoute,
  
  ) {}

  ngOnInit() {

      this.route.parent.params.subscribe(
          params=>{
              this.index_number  = +params['index_number'];
          }
      );
        
              this.studentService.getStudentDetails(this.index_number)
      .subscribe(student => this.student= student ,
        error => this.errorMessage = < any > error);


      var date = new Date();
      this.year = date.getFullYear();
      this.full_date = date.toString();
      
}

getIntroductoryLetter():void{
            this.router.navigate(['/student/'+this.index_number+'/dashboard/introductory-letter-download']);
}

studentHasFoundACompany():void{
            this.router.navigate(['/student/'+this.index_number+'/dashboard/student-searched-for-own-company']);
  }



}
