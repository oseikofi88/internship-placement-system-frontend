import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { StudentDetails } from '../data-models/student-details';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placement-not-done',
  templateUrl: './placement-not-done.component.html',
  styleUrls: ['./placement-not-done.component.css']
})
export class PlacementNotDoneComponent implements OnInit {

index_number: number;
student : StudentDetails 
errorMessage:String;


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






  }

getIntroductoryLetter():void{
    
            this.router.navigate(['/student/'+this.index_number+'/dashboard/introductory-letter-download']);
}



}
