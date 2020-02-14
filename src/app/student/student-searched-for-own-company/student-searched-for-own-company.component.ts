import { Component, AfterViewInit,NgZone,ViewChild,ElementRef,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators , FormArray,FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { validateEmail } from '../../shared/validations/sync-custom-validators';
import { StudentService } from '../student.service';
import { StudentDetails } from '../../student/data-models/student-details';
import { MainDepartment } from '../../shared/interfaces/main-department';
import { CompanyRegister } from '../../company/data-models/company-registration';
import { CompanyService } from '../../company/company.service';
import { SharedService } from '../../shared/services/shared.service';

import { MapsAPILoader,GoogleMapsAPIWrapper } from '@agm/core';
import {} from '@types/googlemaps';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'app-student-searched-for-own-company',
    templateUrl: './student-searched-for-own-company.component.html',
    styleUrls: ['./student-searched-for-own-company.component.css']
})


export class StudentSearchedForOwnCompanyComponent implements OnInit{

    //google maps variables
    public latitude: number;
    public longitude: number;
    public zoom:number;

    @ViewChild("search_ref")
    public searchElRef: ElementRef;
    @ViewChild("longitude_ref")
    public longitudeElRef: ElementRef;
    @ViewChild("latitude_ref")
    public latitudeElRef: ElementRef;
    search_input_valid = false;

    formData:FormData;
    file: File;
    index_number: number;
    company_id : number ; 
    show_order_form :boolean = true;
    company_registration_form :boolean = false;
    want_more_or_not_selection:boolean = true;
    acceptance_letter_available:boolean = false; 
    acceptance_letter_unavailable:boolean = false; 
    acceptance_letter_error:boolean = true;
    registering_company:boolean = false;
    placing_order_for_student:boolean = false;

    student: StudentDetails;
    company: CompanyRegister;
    main_departments : MainDepartment[];

    studentCompanyRegistrationForm: FormGroup;
    orderStudentForm:FormGroup;

    // obtained_latitude: number;
    // obtained_longitude: number;
    // zoom: number;
    // draggable:boolean = true;

    errorMessage: any;


    constructor(
        private fb:FormBuilder,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private studentService: StudentService,
        private sharedService: SharedService,
        private companyService: CompanyService) { }


    ngOnInit() {
        this.zoom= 14;
        this.latitude = 6.673175;
        this.longitude = -1.565423;

        this.route.parent.params.subscribe(
            params=> {
                this.index_number = +params['index_number'];
            }
        );



        this.studentService.getStudentDetails(this.index_number)
            .subscribe(student => {
                this.student = student;
            },
                error => this.errorMessage = < any > error);


        this.studentCompanyRegistrationForm = this.fb.group({
            index_number: [this.index_number, [Validators.required]],
            name: ['', [Validators.required]],
            email: ['', [validateEmail]],
            phone: [''],
            location: this.fb.group({
                name: ['',[Validators.required]],
                detailed_address: ['', [Validators.required]],
                district: ['', [Validators.required]],
                region: ['', [Validators.required]],
                address: ['',[Validators.required]],
                latitude : [ '000000000',],
                longitude : [ '000000000',],
            }),
            postal_address: [''],
            website: [''],
            acceptance_letter: [''],
            company_representative_name: [''],
            company_representative_email: [''],
            company_representative_phone: ['']

        });


        this.sharedService.getMainDepartments()
            .subscribe(main_departments => {
                this.main_departments = main_departments;
                this.orderForm();
            },
                error => this.errorMessage = < any > error);


        // /*var company_name_control  = */this.studentCompanyRegistrationForm.controls['company_name'].valueChanges.subscribe(
        // company_name_control.valueChanges
        // .debounceTime(200)
        // .distinctUntilChanged()
        // .subscribe(company_name_control => this.studentService.suggestCompaniesRegistered(company_name_control)
        // .subscribe(response => console.log(response)));

//         this.mapsAPILoader.load().then(() => {

//             let autocomplete = new google.maps.places.Autocomplete(this.searchElRef.nativeElement, {
//                 types: [] 
//             });
//             autocomplete.addListener("place_changed", () => {
//                 this.ngZone.run(() => {

//                     let place: google.maps.places.PlaceResult = autocomplete.getPlace();



//                     if (place.geometry === undefined || place.geometry === null) {
//                         return ;
//                     }
//                     let  location_latitude = place.geometry.location.lat();
//                     let	location_longitude = place.geometry.location.lng();

//                     this.latitude = location_latitude;
//                     this.longitude = location_longitude;


//                     let detailed_address = "";
//                     let final_detailed_address = "";
//                     place.address_components.forEach( address =>{
//                         final_detailed_address +=  detailed_address.concat(address.long_name).concat('/');
//                     })

//                     this.studentCompanyRegistrationForm.patchValue({location:{name:this.searchElRef.nativeElement.value}});
//                     this.studentCompanyRegistrationForm.patchValue({location:{address:place.formatted_address}})
//                     this.studentCompanyRegistrationForm.patchValue({location:{detailed_address:final_detailed_address.substring(0,final_detailed_address.length - 1)}})
//                     this.studentCompanyRegistrationForm.patchValue({location:{district:place.address_components[place.address_components.length-3].long_name}})
//                     this.studentCompanyRegistrationForm.patchValue({location:{region:place.address_components[place.address_components.length-2].long_name}})
//                     this.studentCompanyRegistrationForm.patchValue({location:{latitude:location_latitude}});
//                     this.studentCompanyRegistrationForm.patchValue({location:{longitude:location_longitude}});


//                     /**check if the location details of the selected location by the user  has been returned from
//                      * google maps.
//                      * Using only the location name to check this because if the
//                      * if the name is returned , it comes along with the
//                      * formatted address, longitude and latitude hence no
//                      * need to check all this.
//                      **/
//                     if(this.studentCompanyRegistrationForm.get('location').get('name').value !== null ){
//                         this.search_input_valid = true;

//                         // this.location_details_obtained_from_google_maps= true;
//                     }

//                 });
//             });
//         });
    }


    orderForm(){
        this.orderStudentForm = this.fb.group({
            company_id : [],
            mainDepartmentData:this.fb.array([])
        });
        this.loadDepartment() 
    }





    // onKey(event:any){
    //     console.log(event.target.value +  " " );
    //     this.studentService.suggestCompaniesRegistered(event.target.value)
    //     .subscribe(response => console.log(response));

    // }


    addMainDepartments(main_department:any):any{

        let group = this.fb.group({
            main_department_id :[main_department.id], 
            subDepartmentData: this.fb.array([])
        })

        main_department.sub_departments.forEach(sub_department =>{
            this.addSubDepartment(group.controls.subDepartmentData, sub_department.id)
        })

        return group;


    }

    loadDepartment(){
        this.main_departments.forEach(main_department =>{
            const control: FormArray = this.orderStudentForm.get('mainDepartmentData') as FormArray;
            control.push(this.addMainDepartments(main_department));
        });
    }


    addSubDepartment(main_department:any, sub_department_id?:any){
        let group = this.fb.group({
            sub_department_id:[sub_department_id],
            number_needed:[0]
        })
        main_department.push(group)


    }

    // pos(event){
    //     this.ngZone.run(() => {

    //         this.obtained_latitude= event.coords.lat;
    //         this.obtained_longitude= event.coords.lng;

    //         let geocoder =  new google.maps.Geocoder();
    //         let updated_coordinates_from_marker = { lat : this.obtained_latitude , lng : this.obtained_longitude };


    //         geocoder.geocode({'location':updated_coordinates_from_marker}, (results, status) => {

    //             if (status == google.maps.GeocoderStatus.OK) {
    //                 if (results[0] != null) {
    //                     let current_results = 0;
    //                     let detailed_address = "";
    //                     let final_detailed_address = "";
    //                     results.forEach( address =>{
    //                         current_results++;
    //                         if(current_results == results.length){
    //                             final_detailed_address +=  detailed_address.concat(address.formatted_address);
    //                         }
    //                         else{

    //                             final_detailed_address +=  detailed_address.concat(address.formatted_address).substr(0,address.formatted_address.indexOf(",")).concat('/');
    //                         }
    //                     })

    //                     this.studentCompanyRegistrationForm.patchValue({location:{name:results[0].formatted_address }});
    //                     this.studentCompanyRegistrationForm.patchValue({location:{address:results[1].formatted_address }});
    //                     this.studentCompanyRegistrationForm.patchValue({location:{detailed_address:final_detailed_address}});
    //                     this.studentCompanyRegistrationForm.patchValue({location:{district: results[results.length-3].formatted_address}});
    //                     this.studentCompanyRegistrationForm.patchValue({location:{region: results[results.length-2].formatted_address}});
    //                     this.studentCompanyRegistrationForm.patchValue({location:{latitude: this.obtained_latitude}});
    //                     this.studentCompanyRegistrationForm.patchValue({location: {longitude: this.obtained_longitude}});
    //                     this.studentCompanyRegistrationForm.patchValue({company_representative_name: this.student[0].surname + ' ' + this.student[0].other_names});
    //                     this.studentCompanyRegistrationForm.patchValue({company_representative_phone: this.student[0].phone});
    //                     this.studentCompanyRegistrationForm.patchValue({company_representative_email: this.student[0].email});

    //                     // the patch value for company_representative_name and representative phone had to be initialized here
    //                     // because as of the time the initializing of the forms , // the student may not have been defined.
    //                     // lol i know i could have put the form group function in the subscribe method to initialize the form upon completion of the request
    //                     // but lol it is not guy. this one works anyways



    //                 }
    //                 else {
    //                     alert("No address available");
    //                 }
    //             }
    //         });



    //     });
    // }



    fileChange(event){
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            this.formData= new FormData();
            this.formData.append('uploadFile', file, file.name);
            this.studentCompanyRegistrationForm.patchValue({acceptance_letter: this.formData});
        }
        this.acceptance_letter_unavailable= !this.acceptance_letter_unavailable;
        this.acceptance_letter_error = false;
    }

    acceptanceLetterUnavailable():void{
        alert("You can register the company without the confirmation letter. But "+ 
            "for your own interest please do well to get the letter from the company and upload it later");
        this.acceptance_letter_available= !this.acceptance_letter_available;
        this.acceptance_letter_error = false;
    }


    registerCompany():void{
    this.studentCompanyRegistrationForm.patchValue({location:{detailed_address:this.studentCompanyRegistrationForm.get('location').get('name').value + '-' + this.studentCompanyRegistrationForm.get('location').get('address').value }} )
        
        if(this.studentCompanyRegistrationForm.valid && this.studentCompanyRegistrationForm.dirty){
            let input = JSON.stringify(this.studentCompanyRegistrationForm.value);

            if(this.studentCompanyRegistrationForm.get('acceptance_letter').value == '' ){
                this.formData = new FormData();
            }

            this.formData.append("input",input);
            this.registering_company = !this.registering_company;
            this.studentService.studentRegisterCompany(this.formData)
                .subscribe(
                    response=> {
                        if (response.operation_successful === true){
                            this.registering_company = !this.registering_company;
                            alert("Your company has been registered ");
                            this.companyDoNotWantMoreStudents();

                        } 
                        else{
                            alert('hmmm sorry we couldn\'t complete the request');
                            this.registering_company = !this.registering_company;
                        }

                    },




                    (error:any) => {
                            alert("Sorry your request couldn\'t be completed due to an error.Please try again later ");
                            window.location.reload();
                    
                   this.errorMessage = < any > error});

        }
    }

    submitOrder():void{

        this.orderStudentForm.patchValue({company_id: this.company_id});
        var orders = this.orderStudentForm.value;
        var main_departments = orders.mainDepartmentData;
        var total_number_of_students_ordered_for = 0;


        for(var i=0; i<main_departments.length;i++){
            for(var j=0; j<main_departments[i].subDepartmentData.length; j++){

                if(main_departments[i].subDepartmentData[j].number_needed < 0){
                    alert("Please check the order there appears to be a negative number entered"); 
                    return;
                }

                total_number_of_students_ordered_for += main_departments[i].subDepartmentData[j].number_needed;

            }
        }

        if (total_number_of_students_ordered_for == 0){
            alert("Please you need to order from at least one department")
        }
        if (total_number_of_students_ordered_for>0){

            this.placing_order_for_student = !this.placing_order_for_student;
            this.studentService.studentMakeOrder(this.orderStudentForm.value)
                .subscribe(
                    response=> {
                        if(response.operation_successful == true){

                            this.placing_order_for_student = !this.placing_order_for_student;
                            alert("You made the order. Thank you"); 
                            this.router.navigate(['/student/'+this.index_number+'/dashboard/placement-done-student-placed']);

                        }
                        else{
                            alert('Hmmm sorry we couldn\'t complete your request');
                        }

                    },




                    (error:any) => {
                            alert("Sorry your request couldn\'t be completed due to an error.Please try again later ");
                            window.location.reload();
                    
                   this.errorMessage = < any > error});

        }
    }
    companyWantMoreStudents(){

        this.want_more_or_not_selection = true;
        this.show_order_form = false;

    }
    companyDoNotWantMoreStudents(){

        alert("You have registered your company. You can get access to the appraisal form and log sheet now. ")

        this.router.navigate(['/student/'+this.index_number+'/dashboard/placement-done-student-placed']);




    }

    goBackToDashboard():void{

        this.router.navigate(['/student/'+this.index_number+'/dashboard/placement-done-student-not-placed']);


    }
    goBackToWantMoreOrNotPage():void{
        this.want_more_or_not_selection = !this.want_more_or_not_selection;
        this.show_order_form = !this.show_order_form;

    }



}
