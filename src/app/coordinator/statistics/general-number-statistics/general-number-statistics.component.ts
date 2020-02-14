import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general-number-statistics',
  templateUrl: './general-number-statistics.component.html',
  styleUrls: ['./general-number-statistics.component.css']
})
export class GeneralNumberStatisticsComponent implements OnInit {
    coordinator_id:number;

  constructor(
  
   private  router : Router,
  private route: ActivatedRoute,
  
  ) { }


  ngOnInit() {
      this.route.parent.params.subscribe(

          params=>{
              this.coordinator_id= +params['coordinator_id'];
          }
      );
  }
    generalStudentStatistics(){
    
            this.router.navigate(['coordinator/'+this.coordinator_id+'/dashboard/general-number-statistics/student-statistics']);
    }


    generalCompanyStatistics(){
            this.router.navigate(['coordinator/'+this.coordinator_id+'/dashboard/general-number-statistics/company-statistics']);
    }

}
