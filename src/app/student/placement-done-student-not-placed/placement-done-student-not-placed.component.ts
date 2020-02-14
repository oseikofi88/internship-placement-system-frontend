import { Component, OnInit,Inject } from '@angular/core';
import { StudentDetails } from '../../student/data-models/student-details';
import { StudentService} from '../student.service'
import { Router,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-placement-done-student-not-placed',
  templateUrl: './placement-done-student-not-placed.component.html',
  styleUrls: ['./placement-done-student-not-placed.component.css']
})
export class PlacementDoneStudentNotPlacedComponent implements OnInit {

index_number: number;
student : StudentDetails 
errorMessage:String;
hide_content:boolean = false;
hide_company_register:boolean = true;
started_internship_already:boolean=true;

  constructor(
  private studentService: StudentService,
  private route: ActivatedRoute,
      private router: Router,
  ) {}

  ngOnInit() {


      this.route.parent.params.subscribe(
          params=>{
              this.index_number  = +params['index_number'];
              this.hide_content = false;
          }
      );
        
              this.studentService.getStudentDetails(this.index_number)
      .subscribe(student => this.student= student ,
        error => this.errorMessage = < any > error);
  }

getIntroductoryLetter():void{
            this.router.navigate(['/student/'+this.index_number+'/dashboard/introductory-letter-download']);
}

studentHasFoundACompany():void{
    this.hide_company_register = !this.hide_company_register;
            this.router.navigate(['/student/'+this.index_number+'/dashboard/student-searched-for-own-company']);
  }

  }
