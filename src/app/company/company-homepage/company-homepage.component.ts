import { Component, OnInit,HostListener } from '@angular/core';
import { NavbarService } from '../../shared/services/navbar.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-homepage',
  templateUrl: './company-homepage.component.html',
  styleUrls: ['./company-homepage.component.css']
})
export class CompanyHomepageComponent implements OnInit {

 @HostListener('window:popstate', ['$event'])
  onPopState(event) {
      this.navigation_bar.show();
  }
    homepage_caption: boolean = true;

    constructor(
        private route: ActivatedRoute,
		public navigation_bar:NavbarService,
    private router: Router) { }

  ngOnInit() {
		this.navigation_bar.hide();
  }


    signInPage(){
        this.homepage_caption = !this.homepage_caption;
        this.router.navigate(['company/login'])

        
    }

    registerPage(){
        this.homepage_caption = !this.homepage_caption;
    this.router.navigate(['company/register'])}

}
