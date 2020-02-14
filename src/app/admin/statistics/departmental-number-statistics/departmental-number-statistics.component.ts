import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-departmental-number-statistics',
  templateUrl: './departmental-number-statistics.component.html',
  styleUrls: ['./departmental-number-statistics.component.css']
})
export class DepartmentalNumberStatisticsComponent implements OnInit {

    admin_id:string;


  constructor(
  
   private  router : Router,
  private route: ActivatedRoute, 
  ) { }


  ngOnInit() {


      this.route.parent.params.subscribe(

          params=>{
              this.admin_id= params['admin_id'];
          }
      );
  }
    departmentalStudentStatistics(){
    
            this.router.navigate(['admin/'+this.admin_id+'/dashboard/number-statistics/student-statistics']);
    }


    departmentalCompanyStatistics(){
            this.router.navigate(['admin/'+this.admin_id+'/dashboard/number-statistics/company-statistics']);
    }

}

