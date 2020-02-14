import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service'; 
import { Router,ActivatedRoute } from '@angular/router';

import { PlacementService } from '../../shared/services/placement.service';
import { NavbarService } from '../../shared/services/navbar.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

    hide_sidebar:boolean  = false;
  constructor(private authenticationService : AuthenticationService,
   private  router : Router,
  private route: ActivatedRoute,
		public nav:NavbarService,
  private placementService: PlacementService) {}
ngOnInit() {

		this.nav.hide();
      
  }


placeStudents(){
    
    this.placementService.placeStudents()
          .subscribe(
 
			  response=> {
      if(response.operation_successful){
          alert("so the placement has being done,debug , debug");


          }
                  else{
                      alert("hmmm your request couldn't be completed");
                  }




},
    error => {
        console.log(error);

          });

}


    hideSidebar():void{
        this.hide_sidebar= !this.hide_sidebar;
    }


    logout(){
		this.nav.show();
        this.authenticationService.adminLogout();
        this.router.navigate(['/admin/login']);
    }
}




