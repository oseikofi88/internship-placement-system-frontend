import { Component, OnInit,HostListener } from '@angular/core';

import { NavbarService } from '../../shared/services/navbar.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-homepage',
  templateUrl: './student-homepage.component.html',
  styleUrls: ['./student-homepage.component.css']
})
export class StudentHomepageComponent implements OnInit {

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
        this.router.navigate(['student/login'])

        
    }

    registerPage(){
        this.homepage_caption = !this.homepage_caption;
    this.router.navigate(['student/register'])}

}
