import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../shared/services/navbar.service';
import { AuthenticationService } from '../../shared/services/authentication.service'; 
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coordinator-dashboard',
  templateUrl: './coordinator-dashboard.component.html',
  styleUrls: ['./coordinator-dashboard.component.css']
})
export class CoordinatorDashboardComponent implements OnInit {

    hide_sidebar : boolean = false;
  constructor(
  
    private authenticationService : AuthenticationService,
    private  router : Router,
    private route: ActivatedRoute,
    public nav:NavbarService,
  ) { }

  ngOnInit() {

        this.nav.hide();
  }

hideSidebar():void{
    this.hide_sidebar= !this.hide_sidebar;
}


    logout():void{
this.authenticationService.coordinatorLogout();
this.router.navigate(['/coordinator']);
}
}
