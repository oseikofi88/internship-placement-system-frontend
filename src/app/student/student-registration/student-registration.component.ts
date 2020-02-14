import { Component,OnInit, ElementRef, NgZone,  ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {  Observable } from 'rxjs/Observable'

import { validateEmail,checkPasswordMatch } from '../../shared/validations/sync-custom-validators'
import { AsyncValidationService }  from '../../shared/services/async-custom-validation-service'
import { StudentService } from '../student.service';
import { SharedService } from '../../shared/services/shared.service';
import { StudentRegister} from '../data-models/student-registration'
import { MainDepartment } from '../../shared/interfaces/main-department'
import { NavbarService } from '../../shared/services/navbar.service';
import { SubDepartment } from '../../shared/interfaces/sub-department';

import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';



@Component({ selector: 'app-student-registration',
    templateUrl: './student-registration.component.html',
    styleUrls: ['./student-registration.component.css'],

})


export class StudentRegistrationComponent implements OnInit {



    latitude: number;
    longitude: number;
    zoom: number

    @ViewChild("search_ref")
    searchElRef: ElementRef;
    location_details_obtained_from_google_maps = false;  

    //hide or show form div
    first_form = true;
    second_form = true;
    third_form = true;
    submitted = true;

    //hide or show instruction div 
    first_instruction_div = false;
    second_instruction_div = true;
    third_instruction_div = true;


    //hide or show registering student div
    registering_student:boolean = true;


    entered_password:string = "";
    selected_sub_department_name:string = "";
    selected_student_type:string = "";
    want_placement:string = "" ;
    area_of_residence:string="";
    selected_main_department_name:string = "";
    sub_department_index:number;
    sub_department_name:string;
    sub_department_id:number;
    index_number:any;

    studentForm:FormGroup;

    errorMessage:String;

    main_departments:MainDepartment[];
    sub_departments:SubDepartment;
    student:StudentRegister;

    constructor(
        private fb:FormBuilder,
        private studentService:StudentService,
        private sharedService:SharedService,
        private asyncValidationService:AsyncValidationService,
        private router: Router,
        public navigation_bar:NavbarService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone) {}

    ngOnInit():void {

        this.navigation_bar.hide();

        this.zoom = 4;
        this.latitude = null;
        this.longitude = null;

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        {
            alert("We have realised you are using a mobile/tablet device to access the site.Please be aware that the site is not optimized for such devices.For the best user experience , we advice you use your PC's Chrome browser if you experience any issues")
        }


        this.setCurrentPosition();

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


                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();



                    let detailed_address = "";
                    let final_detailed_address = "";
                    place.address_components.forEach( address =>{
                        final_detailed_address +=  detailed_address.concat(address.long_name).concat('/');
                    })

                    this.studentForm.patchValue({locale:{name:this.searchElRef.nativeElement.value}});
                    this.studentForm.patchValue({locale:{address:place.formatted_address}})
                    this.studentForm.patchValue({locale:{detailed_address:final_detailed_address.substring(0,final_detailed_address.length - 1)}})
                    this.studentForm.patchValue({locale:{district:place.address_components[place.address_components.length-3].long_name}})
                    this.studentForm.patchValue({locale:{region:place.address_components[place.address_components.length-2].long_name}})
                    this.studentForm.patchValue({locale:{latitude:this.latitude}});
                    this.studentForm.patchValue({locale:{longitude:this.longitude}});
                    this.zoom = 12;


                    console.log(final_detailed_address.substring(0,final_detailed_address.length - 1));

                    /**check if the location details of the selected location by the user  has been returned from
                     * google maps.
                     * Using only the locale name to check this because if the
                     * if the name is returned , it comes along with the
                     * formatted address, longitude and latitude hence no
                     * need to check all this.
                     **/
                    if(this.studentForm.get('locale').get('name').value !== null ){

                        this.location_details_obtained_from_google_maps= true;
                    }

                });
            });
        });


        this.sharedService.getMainDepartments()
        .subscribe(main_departments =>
            {            
                this.main_departments  = main_departments;
            } ,
            error => this.errorMessage = < any > error);

        this.createForm();
    }

    createForm():void {
        this.studentForm = this.fb.group({
            index_number: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7),
                Validators.pattern('^[0-9]*$')],this.asyncValidationService.checkIfIndexNumberHasAlreadyRegistered.
                bind(this.asyncValidationService)],



            surname: ['', [Validators.required, Validators.pattern('^[A-Za-z- ]*$')]],
            other_names: ['', [Validators.required, Validators.pattern('^[A-Za-z- ]*$')]],

            locale: this.fb.group({
                search_place : ['',[Validators.required]],
                name: ['',[Validators.required]],
                detailed_address: ['', [Validators.required]],
                district: ['', [Validators.required]],
                region: ['', [Validators.required]],
                address: ['',[Validators.required]],
                latitude : [ '',[Validators.required]],
                longitude : ['',[Validators.required]],
            }),

            phone: ['', [Validators.required, Validators.pattern('^[0-9\+/\]{10,}$')]],
            email: ['', [Validators.required, validateEmail]],

            passwords: this.fb.group({
                password: ['', [Validators.required, Validators.minLength(5)]],
                confirm_password: ['', Validators.required],
            }, {
                validator: checkPasswordMatch
            }),
            main_department: ['', [Validators.required]],
            sub_department: ['', [Validators.required]],
            foreign_student: ['1'], 
            want_placement: ['1'] 
        });


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
        this.studentForm.patchValue({sub_department:null});
    }

    onSelectSubDepartment(event):void{
        this.sub_department_index = event.target.value;
        this.sub_department_name = this.sub_departments[this.sub_department_index].name;
        this.sub_department_id= this.sub_departments[this.sub_department_index].id;
    }

    private setCurrentPosition():void {
        /** use html 5 geolocation to get current location
         *and set google maps coordinates to that location
         *to display on map
         **/

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }



    firstForm():void {
        this.first_form = !this.first_form;
    }


    secondForm():void {
        this.second_form = !this.second_form;
    }


    thirdForm():void {
        this.third_form = !this.third_form;
    }


    displayFormInputs():void{
        var raw_password = this.studentForm.get('passwords').get('password').value; 
        var asterixed_password = this.replaceSomeCharWithAsterix(raw_password);
        this.entered_password = asterixed_password;

        if(this.studentForm.get('foreign_student').value == 1){
            this.selected_student_type = "International Student";
        }
        else{
            this.selected_student_type = "Ghanaian Student";
        }
        if(this.studentForm.get('want_placement').value == 1){
            this.want_placement= "No";
        }
        else{
            this.want_placement= "Yes";
        }


        this.selected_sub_department_name = this.sub_department_name;

        this.area_of_residence = this.studentForm.get('locale').get('name').value;
    }


    replaceSomeCharWithAsterix(password:string):string{

        var asterixed_password = "";
        var length_of_password = password.length;
        var arrayed_password = password.split("");

        for(var i= 0; i<length_of_password;i++){
            if(i%2 === 0){
                asterixed_password =  asterixed_password.concat("*")
            }
            else{
                asterixed_password =  asterixed_password.concat(arrayed_password[i])
            }
        }
        return asterixed_password;

    }


    registerStudent(): void {
        this.studentForm.patchValue({sub_department:this.sub_department_id})

            let student_form_inputs = Object.assign({},this.student, this.studentForm.value);
            this.registering_student = !this.registering_student;
            this.studentService.registerStudent(student_form_inputs)
                .subscribe(
                    response => {
                        if (response.operation_successful = true){
                            this.index_number = response.index_number;
                            localStorage.setItem('currentStudentUser',JSON.stringify({user_id: response.user_id , token: response.token}));
                            this.registering_student = !this.registering_student;
                            this.studentDetailsSaved();
                        }
                    },

                    (error:any) => {
                        console.log(error);

                        alert("Sorry your request couldn\'t be completed due to an error.Please try again later ");

                        // window.location.reload();


                        this.errorMessage = < any > error;
                        console.log(this.errorMessage);
                    });


    }

    studentDetailsSaved(): void{
        alert("You have successfully registered!");
        this.router.navigate(['/student/'+this.studentForm.get('index_number').value+'/dashboard']);
        this.studentForm.reset();
    }

    goToStudentHomePage():void{
        this.router.navigate(['student']);
    }

    goToSecondInstructionFromFirstInstruction():void{
        this.studentForm.patchValue({sub_department:this.sub_department_id});
        this.first_instruction_div = !this.first_instruction_div;
        this.second_instruction_div = !this.second_instruction_div;

    }

    goToFirstInstructionsFromSecondInstruction():void{
        this.first_instruction_div = !this.first_instruction_div;
        this.second_instruction_div = !this.second_instruction_div;

    }

    goToThirdInstructionFromSecondInstruction():void{
        this.second_instruction_div = !this.second_instruction_div;
        this.third_instruction_div = !this.third_instruction_div;
    }

    goToSecondInstructionFromThirdInstruction():void{
        this.second_instruction_div = !this.second_instruction_div;
        this.third_instruction_div = !this.third_instruction_div;
    }

    goToFirstInstructionFromSecondInstruction():void{
        this.first_instruction_div = !this.first_instruction_div; 
        this.second_instruction_div = !this.second_instruction_div;
    }

    goToFirstRegistrationForm():void{
        this.third_instruction_div = !this.third_instruction_div;
        this.first_form= !this.first_form;
    }

}
