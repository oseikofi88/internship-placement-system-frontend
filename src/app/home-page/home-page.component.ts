import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../shared/services/navbar.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

    constructor( public nav: NavbarService) {}

    ngOnInit() {
        this.nav.show();
    }

}
