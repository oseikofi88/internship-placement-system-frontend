import { Component, OnInit,NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { validateEmail} from '../../shared/validations/sync-custom-validators'

import { StudentDetails } from '../../student/data-models/student-details';
import { StudentService} from '../student.service'

import { MapsAPILoader,GoogleMapsAPIWrapper} from '@agm/core';
import {} from '@types/googlemaps';
import { StudentSupervisorUpdate } from '../data-models/student-supervisor-details-update'

@Component({
    selector: 'app-student-has-started-internship',
    templateUrl: './student-has-started-internship.component.html',
    styleUrls: ['./student-has-started-internship.component.css']
})
export class StudentHasStartedInternshipComponent implements OnInit {

    supervisorDetailsUpdateForm:FormGroup;
	studentSupervisor: StudentSupervisorUpdate;

    latitude: number;
    longitude: number;
    zoom :number = 4;
    draggable: boolean = true;
    
    updated_company_address: string;
    updated_company_latitude: number;
    updated_company_longitude : number;

    supervisor_name:string = '';
    supervisor_email:string = '';
    supervisor_contact:string = '';
    
    index_number : number;
    errorMessage: any;
    
	
	company_location_updated :  boolean = false;
    student_wants_to_update_company_location: boolean = false;

    updating_details:boolean=false;
    
	
	student: StudentDetails;

    constructor(private fb:FormBuilder,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private studentService: StudentService) { }

    ngOnInit() {

	this.zoom = 4;
    this.latitude = null;
    this.longitude = null;

        this.route.parent.parent.params.subscribe( //parent.parent because we need to go up two levels to get the route parameters.ie first parent to the placement-done-student-placed-component url and second parent student/:parameter/dashboard url 
            params=>{
                this.index_number  = +params['index_number'];
            }
        );

        this.studentService.getStudentDetails(this.index_number)
            .subscribe(student => {
                this.student= student;
                this.latitude = +this.student[0].company.location.latitude;
                this.longitude = +this.student[0].company.location.longitude;
                
                this.zoom = 14;
                if ( this.student[0].company.location.updated_by !== null){
                    this.company_location_updated = true;
                };
                if(this.student[0].supervisor_name !== null){
                    this.supervisor_name = this.student[0].supervisor_name;
                    this.supervisor_contact = this.student[0].supervisor_contact;
                    this.supervisor_email = this.student[0].supervisor_email;

                }
                
                this.initalizeForm();
            },
                error => this.errorMessage = < any > error);


    }

    studentWantsToUpdateCompanyLocation ():void{
        this.student_wants_to_update_company_location= true;
    
}

    initalizeForm(){
    
        this.supervisorDetailsUpdateForm= this.fb.group({
			index_number:[this.index_number],
            supervisor_name: [this.supervisor_name, [Validators.required]],
            supervisor_contact:[this.supervisor_contact,[Validators.required, Validators.pattern('^[0-9\+]{10,}$')]],
            supervisor_email:[this.supervisor_email,[Validators.required,validateEmail]],
            company_location: this.fb.group({
          name: [''],
                detailed_address: ['' ],
                district: ['' ],
                region: ['' ],
          address: ['' ],
          latitude: ['' ],
          longitude: ['' ]
        }),

        });

    }
    pos(event){
        this.ngZone.run(() => {

            this.updated_company_latitude = event.coords.lat;
            this.updated_company_longitude = event.coords.lng;
            
            let geocoder =  new google.maps.Geocoder();
            let updated_coordinates_from_marker = { lat : this.updated_company_latitude , lng : this.updated_company_longitude };
             

            geocoder.geocode({'location':updated_coordinates_from_marker}, (results, status) => {       

                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0] != null) {

                    let detailed_address = "";
                    let final_detailed_address = "";
                    results.forEach( address =>{
                        final_detailed_address +=  detailed_address.concat(address.formatted_address).concat('/');
                    })
                        this.supervisorDetailsUpdateForm.patchValue({company_location:{name:results[0].formatted_address }});
                        this.supervisorDetailsUpdateForm.patchValue({company_location:{address:results[1].formatted_address }});
                        this.supervisorDetailsUpdateForm.patchValue({company_location:{detailed_address:final_detailed_address.substring(0,final_detailed_address.length - 1)}});
                        this.supervisorDetailsUpdateForm.patchValue({company_location:{district: results[results.length-3].formatted_address}});
                        this.supervisorDetailsUpdateForm.patchValue({company_location:{region: results[results.length-2].formatted_address}});
                        this.supervisorDetailsUpdateForm.patchValue({company_location:{latitude: this.updated_company_latitude}});
                        this.supervisorDetailsUpdateForm.patchValue({company_location: {longitude: this.updated_company_longitude}});

						
						

                    } else {
                        alert("No address available");
                    }
                }
            });



        });
    }

    updateSupervisorDetails():void{
        console.log(this.supervisorDetailsUpdateForm.value);
        if (this.supervisorDetailsUpdateForm.valid && this.supervisorDetailsUpdateForm.dirty){
            let p = Object.assign({},this.studentSupervisor, this.supervisorDetailsUpdateForm.value);
            this.updating_details = !this.updating_details;
            this.studentService.updateSupervisorDetails(p)
                .subscribe(
					()=> {
            this.updating_details = !this.updating_details;
						alert("You have successfully updated your supervisor details");
            this.router.navigate(['/student/'+this.index_number+'/dashboard/get-appraisal-form-and-logsheet']);
					},


                    (error:any) => {
                            alert("Sorry your request couldn\'t be completed due to an error.Please try again later ");
                            window.location.reload();
                    
                   this.errorMessage = < any > error});

        }
        else{
        alert("No changes made.");
        }
    }

}
