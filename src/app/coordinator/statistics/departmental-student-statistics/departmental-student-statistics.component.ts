import { Component, OnInit } from '@angular/core';
import {SharedService } from '../../../shared/services/shared.service';
import { GeneralStudentStatistics} from '../../../shared/interfaces/general-student-statistics';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-departmental-student-statistics',
  templateUrl: './departmental-student-statistics.component.html',
  styleUrls: ['./departmental-student-statistics.component.css']
})
export class DepartmentalStudentStatisticsComponent implements OnInit {
    student_statistics:GeneralStudentStatistics[];
	errorMessage:String;
    coordinator_id:number;
    loading_data: boolean = true;


        constructor(
        private sharedService:SharedService,
   private  router : Router,
  private route: ActivatedRoute,

        ){}

  ngOnInit() {

   this.loading_data = true 
      this.route.parent.parent.params.subscribe(

          params=>{
              this.coordinator_id= +params['coordinator_id'];
          }
      );
      
      this.sharedService.getDepartmentalStudentStatistics(this.coordinator_id) 
        .subscribe(statistics=>
            {            
                this.student_statistics = statistics;
                this.loading_data =  false;
            } ,
            error => this.errorMessage = < any > error);

  }

}
