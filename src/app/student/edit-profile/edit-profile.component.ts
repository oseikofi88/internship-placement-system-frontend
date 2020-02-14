import { Component,OnInit,AfterViewInit, ElementRef, QueryList,NgZone,  ViewChildren,ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { validateEmail,checkPasswordMatch } from '../../shared/validations/sync-custom-validators'
import { AsyncValidationService }  from '../../shared/services/async-custom-validation-service'
import {StudentService} from '../student.service';
import {SharedService } from '../../shared/services/shared.service';
import { StudentDetails } from '../data-models/student-details';
import { MainDepartment } from '../../shared/interfaces/main-department'
import { SubDepartment } from '../../shared/interfaces/sub-department';



import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements  OnInit,AfterViewInit{

    latitude: number;
    longitude: number;
    zoom: number


    /**
     * We use @ViewChildren for the search_ref 
     * Because of the *ngIf="student" in the template.
     * It messes up the viewinit function and hence undefined is returned 
     * when trying to get the searchElRef value from the DOM
     **/ 

    @ViewChildren("search_ref")
    searchElRef: QueryList<ElementRef>
    @ViewChild("longitude_ref")
    longitudeElRef: ElementRef;
    @ViewChild("latitude_ref")
    latitudeElRef: ElementRef;
    location_details_obtained_from_google_maps = false;  

    studentUpdateDetailsForm:FormGroup;
    student:StudentDetails;
    main_departments :MainDepartment[]
    sub_departments:SubDepartment;

    existing_student_with_index_number_entered:StudentDetails;
    index_number_belongs_to_someone:boolean  = false;
    change_department:boolean = true;
    change_student_type:boolean = true;
    change_company_placement_status:boolean = true;
    change_place_of_residence:boolean = true;
    full_page_loaded:boolean = false;
    updating_details:boolean = false;

    selected_sub_department_name:string = "";
    selected_student_type:string = "";
    want_placement:string = "" ;
    selected_main_department_name:string = "";
    sub_department_index:number;
    sub_department_name:string;
    sub_department_id:number;


    errorMessage:String;

    index_number:number;
    student_type:string = "";
    student_want_placement_status:string = "";
    new_place_of_residence:string;


    constructor(
        private fb:FormBuilder,
        private studentService:StudentService,
        private sharedService:SharedService,
        private asyncValidationService:AsyncValidationService,
        private router: Router,
        private route:ActivatedRoute,
        private mapsAPILoader: MapsAPILoader,
        private page_navigation: Location,
        private ngZone: NgZone) {}

    ngOnInit() {
        this.route.parent.params.subscribe(
            params=>{
                this.index_number  = +params['index_number'];
            }
        );


        this.sharedService.getMainDepartments()
            .subscribe(main_departments =>
                {            
                    this.main_departments  = main_departments;
                } ,
                error => this.errorMessage = < any > error);


        this.studentService.getStudentDetails(this.index_number)
            .subscribe(student => {

            this.student= student; 
                console.log(this.student);
            this.createForm();

        }
            ,
            error => this.errorMessage = < any > error);




}





    createForm():void {
        this.studentUpdateDetailsForm = this.fb.group({
            user_id:[this.student[0].user_id],
            index_number: [this.student[0].index_number, [Validators.required, Validators.minLength(7), Validators.maxLength(7),
                Validators.pattern('^[0-9]*$')]],



            surname: [this.student[0].surname, [Validators.required, Validators.pattern('^[A-Za-z- ]*$')]],
            other_names: [this.student[0].other_names, [Validators.required, Validators.pattern('^[A-Za-z- ]*$')]],

            locale: this.fb.group({
                search_place : [''],
                name: [this.student[0].location.name,[Validators.required]],
                address: [this.student[0].location.address,[Validators.required]],
                detailed_address: [this.student[0].location.detailed_address,[Validators.required]],
                district: [this.student[0].location.district,[Validators.required]],
                region: [this.student[0].location.region,[Validators.required]],
                latitude : [ this.student[0].location.latitude,[Validators.required]],
                longitude : [this.student[0].location.longitude,[Validators.required]],
            }),

            phone: [this.student[0].phone, [Validators.required, Validators.pattern('^[0-9\+/\]{10,}$')]],
            email: [this.student[0].email, [Validators.required, validateEmail]],
            main_department: [''],
            sub_department: [''] ,
            foreign_student: [''],
            want_placement: ['']
        });

        if(this.student[0].foreign_student == 1){
            this.student_type = "International Student";
        }
        else{
            this.student_type= "Ghanaian Student";
        }
        if(this.student[0].want_placement== 1){
            this.student_want_placement_status= "No";
        }
        else{
            this.student_want_placement_status= "Yes";
        }

        this.latitude = parseFloat(this.student[0].location.latitude);
        this.longitude = parseFloat(this.student[0].location.longitude);
        this.zoom = 10;


    }





        ngAfterViewInit(){
        this.searchElRef.changes.subscribe(item => {
        
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElRef.first.nativeElement, {
                types: [] 
			});
			autocomplete.addListener("place_changed", () => {
				this.ngZone.run(() => {

					let place: google.maps.places.PlaceResult = autocomplete.getPlace();

					if (place.geometry === undefined || place.geometry === null) {
						return;
					}
					let  location_latitude = place.geometry.location.lat();
					let	location_longitude = place.geometry.location.lng();

					this.latitude = location_latitude;
					this.longitude = location_longitude;
                    
                    var name_of_entered_location = this.searchElRef.first.nativeElement.value;


                    let detailed_address = "";
                    let final_detailed_address = "";
                    place.address_components.forEach( address =>{
                        final_detailed_address +=  detailed_address.concat(address.long_name).concat('/');
                    })

					this.studentUpdateDetailsForm.patchValue({locale:{name:name_of_entered_location}});
                    this.studentUpdateDetailsForm.patchValue({locale:{address:place.formatted_address}})
                    this.studentUpdateDetailsForm.patchValue({locale:{detailed_address:final_detailed_address.substring(0,final_detailed_address.length - 1)}})
                    this.studentUpdateDetailsForm.patchValue({locale:{district:place.address_components[place.address_components.length-3].long_name}})
                    this.studentUpdateDetailsForm.patchValue({locale:{region:place.address_components[place.address_components.length-2].long_name}})
                    this.studentUpdateDetailsForm.patchValue({locale:{latitude:location_latitude}});
                    this.studentUpdateDetailsForm.patchValue({locale:{longitude:location_longitude}});

					this.studentUpdateDetailsForm.patchValue({locale:{name:name_of_entered_location}});
					this.studentUpdateDetailsForm.patchValue({locale:{address:place.formatted_address}})
					this.studentUpdateDetailsForm.patchValue({locale:{latitude:location_latitude}});
					this.studentUpdateDetailsForm.patchValue({locale:{longitude:location_longitude}});
					this.zoom = 12;

                    this.new_place_of_residence = name_of_entered_location;

                    

                    
                    /**check if the location details of the selected location by the user  has been returned from
                     * google maps.
                     * Using only the locale name to check this because if the
                     * if the name is returned , it comes along with the
                     * formatted address, longitude and latitude hence no
                     * need to check all this.
                     **/
					if(this.studentUpdateDetailsForm.get('locale').get('name').value !== null ){

						this.location_details_obtained_from_google_maps= true;
					}

				});
			});
		});

        })
        this.full_page_loaded = !this.full_page_loaded;

}

    changeDepartment():void{
        this.change_department = !this.change_department;

    }

    checkIfIndexNumberBelongsToSomeone(event):void{
        if(event.target.value.length == 7 ){
            this.index_number_belongs_to_someone =  false;
        

        let entered_index_number = this.studentUpdateDetailsForm.get('index_number').value;

        if(entered_index_number != this.student[0].index_number && this.studentUpdateDetailsForm.get('index_number').valid){
            this.studentService.getStudentDetails(entered_index_number)
                .subscribe(student => {
                    this.existing_student_with_index_number_entered = student;
                    if (student[0] && this.existing_student_with_index_number_entered[0].index_number != null){
                        this.index_number_belongs_to_someone = !this.index_number_belongs_to_someone;

                    }


                }
                    ,
                    error => this.errorMessage = < any > error);

        }
        }






    }


    onSelectMainDepartment(event):void{
        let main_department_index = event.target.value;
        this.selected_main_department_name = this.main_departments[main_department_index].name;
        this.sub_departments = this.main_departments[main_department_index].sub_departments;

        /** the sub_department is set to null after main department selection
         * Because of the ff reason
         * Upon selecting main department say Electrical/Electronics
         * and selecting a sub_departmnet say Computer with an index of 1 
         * then changing the main department to Mechanical and then 
         * selecting sub department Aerospace also with an index of 1
         * the (change) function will not trigger because the index has not changed
         * and hence you'll still get the sub department as computer instead of
         * Aerospace
         **/
        this.studentUpdateDetailsForm.patchValue({sub_department:null});
    }

    onSelectSubDepartment(event):void{
        this.sub_department_index = event.target.value;
        this.sub_department_name = this.sub_departments[this.sub_department_index].name;
        this.sub_department_id= this.sub_departments[this.sub_department_index].id;
    }

    changeStudentType():void{
        this.change_student_type = !this.change_student_type;

    }

    changeWantPlacementStatus():void{
        this.change_company_placement_status = !this.change_company_placement_status;

    }

    changeLocation():void{
        this.change_place_of_residence = !this.change_place_of_residence;

    }
updateDetails():void{

    /**
     * We need to set values of 
     * 1.Placement status
     * 2.Student Type
     * 3.Sub Department 
     * All to their initial values if changes are not made to them
     **/

    if(this.studentUpdateDetailsForm.get('sub_department').value === ""){


		this.studentUpdateDetailsForm.patchValue({sub_department:this.student[0].department});
    
    }
    else{
		this.studentUpdateDetailsForm.patchValue({sub_department:this.sub_department_name});
    }

    if(this.studentUpdateDetailsForm.get('foreign_student').value === ""){
		this.studentUpdateDetailsForm.patchValue({foreign_student:this.student[0].foreign_student});
    
    }

    if(this.studentUpdateDetailsForm.get('want_placement').value === ""){
		this.studentUpdateDetailsForm.patchValue({want_placement:this.student[0].want_placement});
    
    }

		if(this.studentUpdateDetailsForm.dirty && this.studentUpdateDetailsForm.valid ){

			let student_form_inputs = Object.assign({},this.student, this.studentUpdateDetailsForm.value);
            this.updating_details = !this.updating_details;

			this.studentService.updateStudentDetails(student_form_inputs)
				.subscribe(
                    response => {
			if (response.operation_successful === true){
            this.updating_details = !this.updating_details;
					this.studentDetailsSaved();
            }
                    },



                    (error:any) => {
                            alert("Sorry your request couldn\'t be completed due to an error.Please try again later ");
                            window.location.reload();
                    
                   this.errorMessage = < any > error});

		}
		else {
            alert("No changes made")
        this.page_navigation.back();
        
		}

	}

    studentDetailsSaved(): void{
        if(this.studentUpdateDetailsForm.get('index_number').dirty){
        alert("You have successfully updated your details.You changed your index number.Please login again with the new index number.");
		this.router.navigate(['/student/login']);
        }
        else{
        
        alert("You have successfully updated your details");
        this.page_navigation.back();

        }


    }

}


