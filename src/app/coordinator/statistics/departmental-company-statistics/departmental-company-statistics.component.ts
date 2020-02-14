import { Component, OnInit } from '@angular/core';
import {SharedService } from '../../../shared/services/shared.service';
import { DepartmentalCompanyStatistics} from '../../../shared/interfaces/departmental-company-statistics';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-departmental-company-statistics',
  templateUrl: './departmental-company-statistics.component.html',
  styleUrls: ['./departmental-company-statistics.component.css']
})
export class DepartmentalCompanyStatisticsComponent implements OnInit {
    company_statistics:DepartmentalCompanyStatistics[];
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
              this.coordinator_id= params['coordinator_id'];
          }
      );
      
      this.sharedService.getDepartmentalCompanyStatistics(this.coordinator_id) 
        .subscribe(statistics=>
            {            
                this.company_statistics= statistics;
                this.loading_data = false;
            } ,
            error => this.errorMessage = < any > error);

  }
  }

