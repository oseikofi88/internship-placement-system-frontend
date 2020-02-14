import { Component, OnInit } from '@angular/core';
import {SharedService } from '../../../shared/services/shared.service';
import { GeneralStudentStatistics} from '../../../shared/interfaces/general-student-statistics';

@Component({
  selector: 'app-general-student-statistics',
  templateUrl: './general-student-statistics.component.html',
  styleUrls: ['./general-student-statistics.component.css']
})
export class GeneralStudentStatisticsComponent {

    student_statistics:GeneralStudentStatistics[];
    loading_data: boolean = true;

	errorMessage:String;

        constructor(
        private sharedService:SharedService

        ){}


    ngOnInit(){
    
                                this.loading_data = true; 
      this.sharedService.getGeneralStudentStatistics() 
        .subscribe(statistics=>
            {           this.loading_data = false; 
                this.student_statistics = statistics;
            } ,
            error => this.errorMessage = < any > error);
    }



    

    
}
