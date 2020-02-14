import { Component, OnInit,NgZone,ViewChild,ElementRef} from '@angular/core';
import { FormBuilder,FormGroup,Validators , FormArray,FormControl} from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { DepartmentOrder } from '../../shared/interfaces/department-order'
import { CompanyRegister} from '../../company/data-models/company-registration';

import { validateEmail,checkPasswordMatch } from '../../shared/validations/sync-custom-validators'
import { CompanyService} from '../../company/company.service';

import { MapsAPILoader,GoogleMapsAPIWrapper} from '@agm/core';
import {} from '@types/googlemaps';

import { Location } from '@angular/common';


import { NavbarService } from '../../shared/services/navbar.service';


@Component({
    selector: 'app-company-registration',
    templateUrl: './company-registration.component.html',
    styleUrls: ['./company-registration.component.css']
})
export class CompanyRegistrationComponent implements OnInit {

    public latitude: number;
    public longitude: number;

    @ViewChild("search_ref")
    public searchElRef: ElementRef;
    @ViewChild("longitude_ref")
    public longitudeElRef: ElementRef;
    @ViewChild("latitude_ref")
    public latitudeElRef: ElementRef;
    search_input_valid = false;

    auto_suggest_location: boolean = false;
    drag_marker_location: boolean = true;

    company_representative_name_has_error:boolean = false;
    company_representative_phone_has_error:boolean = false;
    companyForm: FormGroup;
    first_form: boolean = false;
    second_form: boolean = true;

    obtained_latitude: number;
    obtained_longitude: number;
    autocomplete_map_zoom: number;
    draggable_map_zoom: number;
    draggable:boolean = true;


    sending_email: boolean = false;
    company: CompanyRegister;
    company_id :number; null;


    errorMessage: any;

    constructor(private fb:FormBuilder,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        public nav:NavbarService,
        private page_navigation: Location,
        private companyService: CompanyService) { }

    ngOnInit() {
        this.nav.hide();
        this.draggable_map_zoom= 4;
        this.obtained_latitude = 6.673175;
        this.obtained_longitude = -1.565423;; 



        this.latitude = 6.673175;
        this.longitude = -1.565423;
        this.autocomplete_map_zoom= 14;

        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElRef.nativeElement, {
                types: []
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {

                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    let  location_latitude = place.geometry.location.lat();
                    let 	location_longitude = place.geometry.location.lng();

                    this.latitude = location_latitude;
                    this.longitude = location_longitude;


                    let detailed_address = "";
                    let final_detailed_address = "";
                    place.address_components.forEach( address =>{
                        final_detailed_address +=  detailed_address.concat(address.long_name).concat('/');
                    })

                    console.log(this.searchElRef.nativeElement.value);

                    this.companyForm.patchValue({location:{name:this.searchElRef.nativeElement.value}});
                    this.companyForm.patchValue({location:{address:place.formatted_address}})
                    this.companyForm.patchValue({location:{detailed_address:final_detailed_address.substring(0,final_detailed_address.length - 1)}})
                    this.companyForm.patchValue({location:{district:place.address_components[place.address_components.length-3].long_name}})
                    this.companyForm.patchValue({location:{region:place.address_components[place.address_components.length-2].long_name}})
                    this.companyForm.patchValue({location:{latitude:location_latitude}});
                    this.companyForm.patchValue({location:{longitude:location_longitude}});
                    this.autocomplete_map_zoom= 15;
                    if(this.companyForm.get('location').get('name').value !== null ){

                        this.search_input_valid = true;
                    }

                });
            });
        });

        this.draggable_map_zoom= 4;
        this.obtained_latitude = null;
        this.obtained_longitude = null; 


        this.companyForm = this.fb.group({
            name: ['', [Validators.required]],
            phone: [''],
            email: [''],
            location: this.fb.group({
                search_place : ['',[Validators.required]],
                name: ['', [Validators.required]],
          detailed_address: ['', [Validators.required]],
          district: ['', [Validators.required]],
          region: ['', [Validators.required]],
                address: ['', [Validators.required]],
                latitude: ['', [Validators.required]],
                longitude: ['', [Validators.required]]
            }),
            postal_address: [''],
            website: [''],
            company_representative_name: ['', [Validators.required,Validators.pattern('^[A-Za-z- ]*$')]],
            company_representative_email: [''], 
            company_representative_phone: ['', [Validators.required,Validators.pattern('^[0-9\+]{10,}$')]]

        });


        // this.setCurrentPosition();




    }


    nextForm():void{
        this.first_form = !this.first_form;
        this.second_form = !this.second_form;


    }


    useDragTogetLocation():void{
        this.auto_suggest_location = !this.auto_suggest_location;
        this.drag_marker_location = !this.drag_marker_location;




    }


    pos(event){
        this.ngZone.run(() => {

            this.obtained_latitude= event.coords.lat;
            this.obtained_longitude= event.coords.lng;

            let geocoder =  new google.maps.Geocoder();
            let updated_coordinates_from_marker = { lat : this.obtained_latitude , lng : this.obtained_longitude };


            geocoder.geocode({'location':updated_coordinates_from_marker}, (results, status) => {

                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0] != null) {

                        this.companyForm.patchValue({location:{name:results[0].formatted_address }});
                        this.companyForm.patchValue({location:{address:results[1].formatted_address }});
                        this.companyForm.patchValue({location:{latitude: this.obtained_latitude}});
                        this.companyForm.patchValue({location: {longitude: this.obtained_longitude}});




                    } else {
                        alert("No address available");
                    }
                }
            });



        });
    }


    registerCompany(){
        if(this.companyForm.get('company_representative_name').invalid){
            if(!this.company_representative_name_has_error){
            this.company_representative_name_has_error = !this.company_representative_name_has_error;
            };

        }
        if(this.companyForm.get('company_representative_phone').invalid){
                if(!this.company_representative_phone_has_error){
                
            this.company_representative_phone_has_error = !this.company_representative_phone_has_error;
                }

        }
        if(this.companyForm.dirty && this.companyForm.valid){

            let p = Object.assign({},this.company,this.companyForm.value);
            this.sending_email = !this.sending_email;

            this.companyService.registerCompany(p)
                .subscribe(

                    response=> {
                        if (response.operation_successful === true){
                            this.company_id = response.user.user_id;
                            localStorage.setItem('currentCompanyUserr',JSON.stringify({user_id: response.user_id , token: response.token}));
                            this.sending_email = !this.sending_email;
                            this.router.navigate(['/company/'+this.company_id+'/dashboard/make-order']);
                        }
                        else{
                            alert("Hmm we couldn't register you,Please try again later or contact admin on vacationtraining.coe@gmail.com if problem persist");

                            this.router.navigate(['company/register']);
                            this.companyForm.reset();
                        }

                    },
                    (error:any) => {
                            alert("Sorry your request couldn\'t be completed due to an error.Please try again later ");
                            window.location.reload();
                    
                   this.errorMessage = < any > error});

                    

        }



    }
goBack(){
        this.first_form = !this.first_form;
        this.second_form = !this.second_form;

 
}


nameInputBeingEntered(){
    this.company_representative_name_has_error = false;


    }
phoneInputBeingEntered(){

    this.company_representative_phone_has_error = false;

}

}
