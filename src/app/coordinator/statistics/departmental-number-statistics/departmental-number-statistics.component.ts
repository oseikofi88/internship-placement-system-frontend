import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-departmental-number-statistics',
  templateUrl: './departmental-number-statistics.component.html',
  styleUrls: ['./departmental-number-statistics.component.css']
})
export class DepartmentalNumberStatisticsComponent implements OnInit {

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
    departmentalStudentStatistics(){
    
            this.router.navigate(['coordinator/'+this.coordinator_id+'/dashboard/departmental-number-statistics/student-statistics']);
    }


    departmentalCompanyStatistics(){
            this.router.navigate(['coordinator/'+this.coordinator_id+'/dashboard/departmental-number-statistics/company-statistics']);
    }

}

