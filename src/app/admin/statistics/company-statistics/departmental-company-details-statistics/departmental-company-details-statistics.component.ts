import { Component, OnInit } from '@angular/core';
import { CompanyDetails } from  '../../../../company/data-models/company-details';
import { StudentDetails} from '../../../../student/data-models/student-details';
import { AdminService } from '../../../admin.service';
import { SharedService} from '../../../../shared/services/shared.service';
import { SlotsGiven } from '../../../../shared/interfaces/slots-given';
import { Router,ActivatedRoute } from '@angular/router';
import { DirectionsMapDirective } from '../../../../shared/directives/directions-map.directive';
import { ElementRef, NgZone,  ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms"; 
import { MapsAPILoader,GoogleMapsAPIWrapper} from '@agm/core';
import {} from '@types/googlemaps';



declare var google: any;


@Component({
  selector: 'app-departmental-company-details-statistics',
  templateUrl: './departmental-company-details-statistics.component.html',
  styleUrls: ['./departmental-company-details-statistics.component.css']
})
export class DepartmentalCompanyDetailsStatisticsComponent {

    latitude: number;
    longitude: number;
    
    zoom: number;
    
    origin: any;
    destination: any;
    estimated_duration: any;
    estimated_distance:any;

    company_statistics:CompanyDetails[];
    student_statistics:StudentDetails[];
    slots_statistics:SlotsGiven[];
    details_type:string;

    hide_company_details:boolean = true;
    hide_slots_given:boolean = true;
    hide_students_placed_in_company:boolean = true;
    loading_data: boolean = true;

    admin_id:string;

    hide_company_location:boolean;

    




    current_location_latitude: number;
    current_location_longitude: number;
    current_location_accuracy: any;
    loading_directions:boolean = false;
    @ViewChild(DirectionsMapDirective) directionsMapDirective : DirectionsMapDirective;



    show_map:boolean = false;
  company_id:number;
  company:CompanyDetails;
  errorMessage:String;


    constructor(private sharedService:SharedService,
        private  router:Router,
        private adminService:AdminService,
        private route:ActivatedRoute,
        private mapsAPILoader:MapsAPILoader,
        private ngZone:NgZone,
        private gmapsApi:GoogleMapsAPIWrapper,
        private _elementRef:ElementRef) {



        route.queryParams.forEach(params =>{
            this.hide_company_location = true;

    this.hide_company_details= true;
            this.hide_slots_given = true;
            this.hide_students_placed_in_company = true;
                this.loading_data = true 

            this.route
                .queryParams
                .subscribe(params => {
                    this.details_type= params['details_type'];
                });

            this.route.params.subscribe(
                params =>{
                    this.company_id= params['company_id'];

                }
            );


            this.route.parent.parent.parent.params.subscribe(

                params=>{
                    this.admin_id= params['admin_id'];
                    this.adminService.getDetailsRequested(this.admin_id, this.details_type,this.company_id) 
                        .subscribe(statistics=>
                            {            
                                this.displayAppropriateTableStatistics(statistics);
                                
        this.loading_data =false; 
                                } ,
                                    error => this.errorMessage = < any > error);
                            }
            );

        });


        route.params.forEach(params =>{
    this.hide_company_location=true;

    this.hide_company_details= true;
            this.hide_slots_given = true;
            this.hide_students_placed_in_company = true;
                this.loading_data = true 

            this.route
                .queryParams
                .subscribe(params => {
                    this.details_type= params['details_type'];
                });

            this.route.params.subscribe(
                params =>{
                    this.company_id= params['company_id'];

                }
            );
            this.route.parent.parent.parent.params.subscribe(

                params=>{
                    this.admin_id= params['admin_id'];
                    this.adminService.getDetailsRequested(this.admin_id, this.details_type,this.company_id) 
                        .subscribe(statistics=>
                            {            
                                this.displayAppropriateTableStatistics(statistics);
                                this.loading_data = false;
                            } ,
                            error => this.errorMessage = < any > error);
                }
            );

        });



        }

showLocationDetail():void{

    this.hide_company_location=false;


 alert("This might be inaccurate as the system will use your ISP to get your current location");
    
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
    console.log(this.current_location_latitude);
         
        setTimeout(()=>{ 
            // latency added to give enough time for html5 geolocation to get the browsers coordinates.
        if (this.current_location_latitude === undefined || this.current_location_longitude === undefined ){
                    alert("Your location was not obtained, please enable locations permission  or wait for sometime and try again");
            this.loading_directions = !this.loading_directions;
            return;
        }
        else{

            

         this.directionsMapDirective.origin = { latitude: this.current_location_latitude,  longitude: this.current_location_longitude};  
        this.directionsMapDirective.destination= { latitude: +this.company_statistics[0].location.latitude, longitude: +this.company_statistics[0].location.longitude }
    if(this.directionsMapDirective.directionsDisplay === undefined){ this.mapsAPILoader.load().then(() => { 
        this.directionsMapDirective.directionsDisplay = new google.maps.DirectionsRenderer;
    }); 
    }

            this.directionsMapDirective.getDirections();
            setTimeout(()=>{
            this.estimated_distance = this.directionsMapDirective.estimated_distance ;
            this.estimated_duration= this.directionsMapDirective.estimated_duration;

            },4000)

        }
         this.loading_directions= !this.loading_directions;


        },5000)


}

displayAppropriateTableStatistics(statistics):void{
    console.log(this.details_type);
    switch (this.details_type){
        case 'company_details':
            this.company_statistics= statistics;
            this.hide_company_details= false;
            break;

        case 'slots_given':
            this.slots_statistics = statistics;
            console.log(this.slots_statistics);
            this.hide_slots_given= false;
            break;

        case 'students_placed_in_company':
            this.student_statistics= statistics;
            this.hide_students_placed_in_company= false
            break;



    }
}

  }


