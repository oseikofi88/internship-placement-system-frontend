import { Component, OnInit,Inject } from '@angular/core';
import { StudentDetails } from '../../student/data-models/student-details';
import { StudentService} from '../student.service'
import { Router,ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-get-appraisal-form-and-logsheet',
  templateUrl: './get-appraisal-form-and-logsheet.component.html',
  styleUrls: ['./get-appraisal-form-and-logsheet.component.css']
})
export class GetAppraisalFormAndLogsheetComponent implements OnInit {

index_number: number;
student : StudentDetails 
errorMessage:String;
hide_content:boolean = false;
hide_update_details:boolean = true;
started_internship_already:boolean=true;

  constructor(
  private studentService: StudentService,
  private route: ActivatedRoute,
      private router: Router,
  ) {}

  ngOnInit() {

      this.route.parent.params.subscribe(
          params=>{
              console.log(params);
              this.index_number  = +params['index_number'];
          }
      );
        
              this.studentService.getStudentDetails(this.index_number)
      .subscribe(student => this.student= student ,
        error => this.errorMessage = < any > error);
  }

downloadLogSheet():void{
            this.router.navigate(['/student/'+this.index_number+'/dashboard/log-sheet-download']);
}

downloadAppraisalForm():void{
            this.router.navigate(['/student/'+this.index_number+'/dashboard/confidential-appraisal-form-download']);
    
}

   updateSupervisorDetails():void{
       this.hide_content = !this.hide_content;
       this.hide_update_details = !this.hide_update_details;

            this.router.navigate(['/student/'+this.index_number+'/dashboard/get-appraisal-form-and-logsheet/student-has-started-internship']);

    
   } 





}
