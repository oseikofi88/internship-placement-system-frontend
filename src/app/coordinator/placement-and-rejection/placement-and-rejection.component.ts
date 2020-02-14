import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placement-and-rejection',
  templateUrl: './placement-and-rejection.component.html',
  styleUrls: ['./placement-and-rejection.component.css']
})
export class PlacementAndRejectionComponent implements OnInit {

    coordinator_id:any;


  constructor(
  
   private  router : Router,
  private route: ActivatedRoute, 
  ) { }


  ngOnInit() {


      this.route.parent.params.subscribe(

          params=>{
              this.coordinator_id= params['coordinator_id'];
          }
      );
  }
    manualPlacement(){
    
            this.router.navigate(['coordinator/'+this.coordinator_id+'/dashboard/placement-and-rejection/manual-placement']);
    }


    manualRejection(){
    
            this.router.navigate(['coordinator/'+this.coordinator_id+'/dashboard/placement-and-rejection/manual-rejection']);
    }

}

