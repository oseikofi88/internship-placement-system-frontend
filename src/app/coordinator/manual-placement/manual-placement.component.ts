import { Component, OnInit,NgZone,ViewChild,ElementRef} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {SharedService } from '../../shared/services/shared.service';
import { CompanyDetails } from  '../../company/data-models/company-details';
import { StudentDetails} from '../../student/data-models/student-details';
import { AsyncValidationService }  from '../../shared/services/async-custom-validation-service';
import {StudentService} from '../../student/student.service';
import { FormBuilder,FormGroup,Validators,FormControl ,FormArray} from '@angular/forms';
import { Location } from '@angular/common';
import { MapsAPILoader,GoogleMapsAPIWrapper} from '@agm/core';
import {} from '@types/googlemaps';
import { CompanyRegister} from '../../company/data-models/company-registration';
@Component({
    selector: 'app-manual-placement',
    templateUrl: './manual-placement.component.html',
    styleUrls: ['./manual-placement.component.css']
})
export class ManualPlacementComponent implements OnInit {

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
    coordinator_id:any;

    companies:CompanyDetails[];
    company: CompanyRegister;
    company_id:any;
    registered_company:CompanyDetails;

    control:any;

    placeStudentFromCompanySelectForm :FormGroup;
    placeStudentFromCompanyRegistrationForm:FormGroup;

    obtained_latitude: number;
    obtained_longitude: number;
    zoom: number;
    draggable_map_zoom: number;
    draggable:boolean = true;

    companyRegistrationForm: FormGroup;


    hide_select_from_company_list_option:boolean = true;
    hide_register_company_and_place:boolean = true;
    company_selected : boolean = false;
    hide_order_student_form:boolean = true;
    company_registered:boolean = false;
    student:StudentDetails;
    student_has_company_already:boolean  = false;
    placing_student:boolean = false;
    registering_company: boolean = false;

    index_number :any = "1234";

    loading_data: boolean = false;


    errorMessage:String;
    constructor(


        private fb:FormBuilder,
        private studentService:StudentService,
        private sharedService:SharedService,
        private router: Router,
        private page_navigation: Location,
        private route:ActivatedRoute,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) { }


    ngOnInit() {




        this.route.parent.parent.params.subscribe(

            params=>{
                this.coordinator_id= params['coordinator_id'];
            }
        );




        this.placeStudentFromCompanySelectForm = this.fb.group({
            company : ['',[Validators.required]],
            studentsData : this.fb.array([this.addRows()])
        })

        this.placeStudentFromCompanyRegistrationForm = this.fb.group({
            company : ['',[Validators.required]],
            studentsData : this.fb.array([this.addRows()])
        })

        this.companyRegistrationForm= this.fb.group({
            name: ['', [Validators.required]],
            email: ['',],
            phone: ['', [Validators.pattern('^[0-9\+/\]{10,}$')]],
            location: this.fb.group({
                search_place : ['',[Validators.required]],
                name: ['', [Validators.required]],
                address: ['', [Validators.required]],
                detailed_address: ['', [Validators.required]],
                district: ['', [Validators.required]],
                region: ['', [Validators.required]],
                latitude: ['', [Validators.required]],
                longitude: ['', [Validators.required]]
            }),
            postal_address: [''],
            website: [''],
            company_representative_name: ['', [Validators.pattern('^[A-Za-z- ]*$')]],
            company_representative_email: [''], 
            company_representative_phone: ['', [Validators.pattern('^[0-9\+]{10,}$')]]

        });

        this.draggable_map_zoom= 4;
        this.obtained_latitude = 6.673175;
        this.obtained_longitude = -1.565423;; 



        this.latitude = 6.673175;
        this.longitude = -1.565423;
        this.zoom= 14;

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





                    this.companyRegistrationForm.patchValue({location:{name:this.searchElRef.nativeElement.value}});
                    this.companyRegistrationForm.patchValue({location:{address:place.formatted_address}})
                    this.companyRegistrationForm.patchValue({location:{detailed_address:final_detailed_address.substring(0,final_detailed_address.length - 1)}})
                    this.companyRegistrationForm.patchValue({location:{district:place.address_components[place.address_components.length-3].long_name}})
                    this.companyRegistrationForm.patchValue({location:{region:place.address_components[place.address_components.length-2].long_name}})
                    this.companyRegistrationForm.patchValue({location:{latitude:location_latitude}});
                    this.companyRegistrationForm.patchValue({location:{longitude:location_longitude}});
                    this.zoom= 15;
                    if(this.companyRegistrationForm.get('location').get('name').value !== null ){

                        this.search_input_valid = true;
                    }

                });
            });
        });



    }


    addRows(){
        let group = this.fb.group({
            for_show:[],
            index_numberData:this.fb.array([])
        });

        // this.addStudent(group.controls.index_numberData)

        return group;
    }

    // addStudent(kndex_number){
    // const control: FormArray = this.placeStudentForm.get('studentsData') as FormArray;
    // control.push(this.addRows()); 
    // }
    addStudent(index_numbers :any){
        let group = this.fb.group({
            index_number: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7),
                Validators.pattern('^[0-9]*$')]],
        })

        index_numbers.push(group)
    }

    removeStudent(index_numbers,index){
        index_numbers.controls.index_numberData.removeAt(index)
    }


    registerCompanyAndPlaceStudent():void{

        this.hide_select_from_company_list_option= true;
        this.hide_register_company_and_place= !this.hide_register_company_and_place;
    }
    onSelectCompany(){
        console.log(this.placeStudentFromCompanySelectForm.get('company').value);
        this.company_selected =true 
    }


    selectFromRegisteredCompanyAndPlaceStudents():void{
        this.loading_data = true

        this.hide_register_company_and_place = true;


        this.sharedService.getCompaniesInCoordinatorDepartment(this.coordinator_id)
        .subscribe(companies =>
            {            
                this.hide_select_from_company_list_option = !this.hide_select_from_company_list_option;
                this.companies = companies;
        this.loading_data = false ;
            } ,
                    (error:any) => {
                            alert("Sorry your request couldn\'t be completed due to an error.Please try again later ");
                            window.location.reload();
                    
                   this.errorMessage = < any > error});
    }

    placeStudentsInSelectedCompany(){
        this.placing_student = true;
        if(this.placeStudentFromCompanySelectForm.get('studentsData').pristine){
            alert("Hmm no student has been selected to be placed in company")
            return;
        }
        if(this.placeStudentFromCompanySelectForm.get('studentsData').pristine){
            alert("Hmm no student has been selected to be placed in company")
            return;
        }
        else{
            let company_id = this.placeStudentFromCompanySelectForm.get('company').value;
            let students = this.placeStudentFromCompanySelectForm.get('studentsData').value;
            this.sharedService.placeStudentsInCompany(company_id,students)
                .subscribe(response=>
                    {            
                        if(response == true) {
                            alert("Students Successfully Placed In Company");
                            this.placing_student = false;
                            this.router.navigate(['/coordinator/'+this.coordinator_id+'/dashboard/placement-and-rejection'])
                        }
                    } ,
                    (error:any) => {
                            alert("Sorry your request couldn\'t be completed due to an error.Please try again later ");
                            window.location.reload();
                    
                   this.errorMessage = < any > error});
        }
    }

    placeStudentsInRegisteredCompany(){
        if(this.placeStudentFromCompanyRegistrationForm.get('studentsData').pristine){
            alert("Hmm no student has been selected to be placed in company")
            return;
        }
        if(this.placeStudentFromCompanyRegistrationForm.get('studentsData').pristine){
            alert("Hmm no student has been selected to be placed in company")
            return;
        }
        else{
        this.placing_student = true;
            let company_id = this.placeStudentFromCompanyRegistrationForm.get('company').value;
            let students = this.placeStudentFromCompanyRegistrationForm.get('studentsData').value;
            this.sharedService.placeStudentsInCompany(company_id,students)
                .subscribe(response=>
                    {            
                        if(response == true) {
                            alert("Students Successfully Placed In Company");
                            this.router.navigate(['/coordinator/'+this.coordinator_id+'/dashboard/placement-and-rejection'])
                        }
                    } ,
                    (error:any) => {
                            alert("Sorry your request couldn\'t be completed due to an error.Please try again later ");
                            window.location.reload();
                    
                   this.errorMessage = < any > error});
        }



    }

    registerCompany(){
        this.registering_company = true;

        let p = Object.assign({},this.company,this.companyRegistrationForm.value);
        this.sharedService.registerCompany(p)
            .subscribe(

                response=> {
                    this.registered_company = response[0];
                    this.registering_company = false;
                    this.hide_order_student_form = !this.hide_order_student_form;
                    alert("Company Successfully Registered")
                    this.company_registered = !this.company_registered;
                    this.placeStudentFromCompanyRegistrationForm.patchValue({company:this.registered_company.user_id});

                    this.hide_register_company_and_place = true;


                },
                    (error:any) => {
                            alert("Sorry your request couldn\'t be completed due to an error.Please try again later ");
                            window.location.reload();
                    
                   this.errorMessage = < any > error});



    }
}
