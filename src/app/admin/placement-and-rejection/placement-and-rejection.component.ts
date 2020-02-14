import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placement-and-rejection',
  templateUrl: './placement-and-rejection.component.html',
  styleUrls: ['./placement-and-rejection.component.css']
})
export class PlacementAndRejectionComponent implements OnInit {

    admin_id:any;


  constructor(
  
   private  router : Router,
  private route: ActivatedRoute, 
  ) { }


  ngOnInit() {


      this.route.parent.params.subscribe(

          params=>{
              this.admin_id= params['admin_id'];
          }
      );
      console.log(this.admin_id);
  }
    manualPlacement(){
    
            this.router.navigate(['admin/'+this.admin_id+'/dashboard/placement-and-rejection/manual-placement']);
    }


    manualRejection(){
    
            this.router.navigate(['admin/'+this.admin_id+'/dashboard/placement-and-rejection/manual-rejection']);
    }

}

