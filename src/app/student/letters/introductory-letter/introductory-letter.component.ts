import { Component, OnInit ,Input,Inject } from '@angular/core';
import { StudentDetails } from '../../../student/data-models/student-details';
import { StudentService} from '../../student.service'
import { Router,ActivatedRoute } from '@angular/router';
import * as html2canvas from "html2canvas";
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-introductory-letter',
  templateUrl: './introductory-letter.component.html',
  styleUrls: ['./introductory-letter.component.css']
})
export class IntroductoryLetterComponent implements OnInit {

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
         var dateNow = new Date();
   var dateNowISO = dateNow.toISOString();
      this.full_date = dateNowISO;
      this.year = dateNow.getFullYear();
      






  }




   download() {

// html2canvas(document.getElementById('letter')).then(function(canvas) {
// var pdf = new jsPDF("l", "mm", "a4");
// var imgData = canvas.toDataURL('image/jpeg', .5);

// due to lack of documentation; try setting w/h based on unit
// pdf.addImage(imgData, 'JPEG', 30, 60, 210, 297);  // 180x150 mm @ (10,10)mm
//     pdf.save('Internship Introductory Letter.pdf');

 html2canvas(document.getElementById('letter')).then(function(canvas) {
    var img = canvas.toDataURL("image/png");
var doc= new jsPDF();
    doc.addImage(img,'JPEG',27,28,160.00197555866663,267.0006773335,undefined,'FAST'); 
    doc.save('Internship Introductory Letter.pdf');
    });


}
}
