import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { PlacementService } from '../shared/services/placement.service';
@Component({
  selector: 'app-placement-status',
  template: `hola`,
})
export class PlacementStatusComponent implements OnInit {


    placement_done: boolean;

  constructor(private placementService: PlacementService,
            private route: ActivatedRoute,
            private router: Router) { }

  ngOnInit() {
    // this.placementService.getPlacementStatus()
    //       .subscribe(
    //     data=> {
    //   if(data)
    //         this.router.navigate(['/student/placement-done']);


    //       else{
    //         this.router.navigate(['/student/placement-done']);
    //       }




// },
    // error => {
    //     console.log(error);


// }
}
}
