import { Component, OnInit ,Input,Inject } from '@angular/core';
import { StudentDetails } from '../../../student/data-models/student-details';
import { StudentService} from '../../student.service'
import { Router,ActivatedRoute } from '@angular/router';
import * as html2canvas from "html2canvas";
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-acceptance-letter',
  templateUrl: './acceptance-letter.component.html',
  styleUrls: ['./acceptance-letter.component.css']
})
export class AcceptanceLetterComponent implements OnInit {

index_number: number;
student : StudentDetails 
errorMessage:string;
full_date:any;
year:any;


  constructor(
  private studentService: StudentService,
   private  router : Router,
  private route: ActivatedRoute,
  
   @Inject('Window') private window: Window, 
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

   download() {

 html2canvas(document.getElementById('letter')).then(function(canvas) {
    var img = canvas.toDataURL("image/png");
    var doc = new jsPDF();
    doc.addImage(img,'JPEG',28,28,160.00197555866663,267.0006773335,undefined,'FAST'); 
    doc.save('Internship Acceptance Letter.pdf');
    });
  }


}
