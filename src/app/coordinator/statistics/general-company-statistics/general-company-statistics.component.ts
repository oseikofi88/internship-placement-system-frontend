import { Component, OnInit } from '@angular/core';
import {SharedService } from '../../../shared/services/shared.service';
import { GeneralCompanyStatistics} from '../../../shared/interfaces/general-company-statistics';

@Component({
  selector: 'app-general-company-statistics',
  templateUrl: './general-company-statistics.component.html',
  styleUrls: ['./general-company-statistics.component.css']
})
export class GeneralCompanyStatisticsComponent implements OnInit {

    company_statistics:GeneralCompanyStatistics[];
    loading_data: boolean;

	errorMessage:String;

        constructor(
        private sharedService:SharedService

        ){}


    ngOnInit(){
   this.loading_data = true 
      this.sharedService.getGeneralCompanyStatistics() 
        .subscribe(statistics=>
            {            
                this.company_statistics = statistics;
                this.loading_data = false; 
            } ,
            error => this.errorMessage = < any > error);
    }
  

}
