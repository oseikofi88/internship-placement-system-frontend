import { Component, OnInit ,Input} from '@angular/core';
import { StudentDetails } from  '../../student/data-models/student-details';
import { StudentService} from '../../student/student.service';
import { Router,ActivatedRoute } from '@angular/router';
import { DirectionsMapDirective } from '../../shared/directives/directions-map.directive';
import { ElementRef, NgZone,  ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader,GoogleMapsAPIWrapper} from '@agm/core';
import {} from '@types/googlemaps';
import { PlacementService } from '../../shared/services/placement.service';



declare var google: any;

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

          // origin = { latitude:  6.6970683 ,longitude: -1.54654654 };  
        // destination =  { latitude:  6.0683 ,longitude: -1.5654654 };

        
    latitude: number;
    longitude: number;
    
    zoom: number;
    
    origin: any;
    destination: any;
    estimated_duration: any;
    estimated_distance:any;

    placement_done : any;

    student_placed :boolean;

    




    current_location_latitude: number;
    current_location_longitude: number;
    current_location_accuracy: any;
    loading_directions:boolean = false;
    @ViewChild(DirectionsMapDirective) directionsMapDirective : DirectionsMapDirective;



    show_map:boolean = false;
  index_number:number;
  student:StudentDetails;
  errorMessage:String;


  constructor(private studentService:StudentService,
              private  router:Router,
              private route:ActivatedRoute,
            private placementService: PlacementService,
              private mapsAPILoader:MapsAPILoader,
              private ngZone:NgZone,
              private gmapsApi:GoogleMapsAPIWrapper,
              private _elementRef:ElementRef) {
  }

  ngOnInit() {

      this.zoom = 15;
      this.latitude = 6.673175;
      this.longitude = -1.565423;




    this.route.parent.params.subscribe(
      params=> {
        this.index_number = +params['index_number'];
      }
    );





        this.placementService.getPlacementStatus()
        .subscribe( 
            data=> {
                let placement_status = data;

                //placement status being true means placement done 
                if(placement_status === 'true'){
                    this.placement_done = true;
                }
                else{
                this.placement_done = false;
                }
                });



    this.studentService.getStudentDetails(this.index_number)
      .subscribe(student => {
      
      this.student = student;
          if(student[0].company.name != null){
          this.student_placed = true;
          }
          else{
          this.student_placed = false;
          }
       }, error => this.errorMessage = < any > error);


    }

    trackCompanyFromResidence(){
        this.loading_directions= !this.loading_directions;

         
        setTimeout(()=>{ // latency added just for nice view to make gif load for a short time

         this.directionsMapDirective.origin = { latitude: +this.student[0].location.latitude,  longitude: +this.student[0].location.longitude };
        this.directionsMapDirective.destination= { latitude: +this.student[0].company.location.latitude, longitude: +this.student[0].company.location.longitude };

            if(this.directionsMapDirective.directionsDisplay === undefined){ this.mapsAPILoader.load().then(() => { 
                this.directionsMapDirective.directionsDisplay = new google.maps.DirectionsRenderer;
            }); 
            }
        //this.show_map = true; 
            this.directionsMapDirective.getDirections();
            setTimeout(()=>{ 
            console.log('company-details est time ', this.directionsMapDirective.estimated_distance)
            this.estimated_distance = this.directionsMapDirective.estimated_distance ;
            this.estimated_duration= this.directionsMapDirective.estimated_duration;

            },2000)
            //latency added to allow enough time to make  the public property of estimated_distance and estimated_duration to be set to the value
                //provided by
                //google maps. any value less than
                //2 seconds will make these
                //property undefined



         this.loading_directions= !this.loading_directions;
        }, 3000)


    
    };

    trackCompanyFromCurrentLocation(){
alert("This might be inaccurate as the system will depend on your network service provider to get your current location");
        this.loading_directions= !this.loading_directions;

		if ("geolocation" in navigator) {
            var options = {
                                enableHighAccuracy: true
                              };
			navigator.geolocation.getCurrentPosition((position) => {
				this.current_location_latitude= position.coords.latitude;
				this.current_location_longitude = position.coords.longitude;
                this.current_location_accuracy = position.coords.accuracy;
			});
		}
         
        setTimeout(()=>{ // latency added to give enough time for html5 geolocation to get the browsers coordinates.
        if (this.current_location_latitude === undefined || this.current_location_longitude === undefined ){
                    alert("Your location was not obtained, please enable locations permission  or wait for some time and try again.");
            return;
        }
        else{
            

         this.directionsMapDirective.origin = { latitude: this.current_location_latitude,  longitude: this.current_location_longitude};  
        this.directionsMapDirective.destination= { latitude: +this.student[0].company.location.latitude, longitude: +this.student[0].company.location.longitude }
    if(this.directionsMapDirective.directionsDisplay === undefined){ this.mapsAPILoader.load().then(() => { 
        this.directionsMapDirective.directionsDisplay = new google.maps.DirectionsRenderer;
    }); 
    }

            this.directionsMapDirective.getDirections();
            setTimeout(()=>{
            this.estimated_distance = this.directionsMapDirective.estimated_distance ;
            this.estimated_duration= this.directionsMapDirective.estimated_duration;

            },2000)

        }
         this.loading_directions= !this.loading_directions;


        },5000)
    }






               
	setCurrentPosition() {

}




}
