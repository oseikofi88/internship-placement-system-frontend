import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service'; 
import { Router,ActivatedRoute } from '@angular/router';

import { PlacementService } from '../../shared/services/placement.service';

import { NavbarService } from '../../shared/services/navbar.service';


import { CompanyService} from '../../company/company.service';
import { CompanyDetails} from '../../company/data-models/company-details';


@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {

errorMessage:String;
    company: CompanyDetails;
 
hide_company_status: boolean = false;
hide_sidebar:boolean  = false;
company_id:number;


  constructor(private authenticationService : AuthenticationService,
   private  router : Router,
  private route: ActivatedRoute,
        private companyService: CompanyService,
		public nav:NavbarService,
  private placementService: PlacementService) {
  
  
  
  }

  ngOnInit() {
		this.nav.hide();

      this.route.parent.params.subscribe(
          params=>{
              this.company_id= +params['company_id'];
          }
      );
        
              this.companyService.getCompanyDetails(this.company_id)
      .subscribe(company => { 
          this.company = company;
          console.log(this.company);

      
      },

        error => this.errorMessage = < any > error);


  }
    logout():void{
this.authenticationService.companyLogout();
this.router.navigate(['/company/register']);

}
hideSidebar():void{
    this.hide_sidebar= !this.hide_sidebar;
}



  }
