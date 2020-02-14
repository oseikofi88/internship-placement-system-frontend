import { Component, OnInit,NgZone,ViewChild,ElementRef} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {SharedService } from '../../shared/services/shared.service';
import { FormBuilder,FormGroup,Validators,FormControl ,FormArray} from '@angular/forms';
import { Location } from '@angular/common';
import { MapsAPILoader,GoogleMapsAPIWrapper} from '@agm/core';
import {} from '@types/googlemaps';
import { CompanyRegister} from '../../company/data-models/company-registration';
import { MainDepartment } from '../../shared/interfaces/main-department';

@Component({
  selector: 'app-register-company-and-make-order',
  templateUrl: './register-company-and-make-order.component.html',
  styleUrls: ['./register-company-and-make-order.component.css']
})
export class RegisterCompanyAndMakeOrderComponent implements OnInit {

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
    coordinator_email:any;

    company: CompanyRegister;
    company_id:any;

    control:any;


    main_departments : MainDepartment[];
    orderStudentForm:FormGroup;
    obtained_latitude: number;
    obtained_longitude: number;
    zoom: number;
    draggable_map_zoom: number;
    draggable:boolean = true;

    companyRegistrationForm: FormGroup;



    hide_order_student_form:boolean = true;
    hide_register_company:boolean = false;
    placing_order_for_student : boolean = false;
    registering_company : boolean = false;


    errorMessage:String;
    constructor(

        private fb:FormBuilder,
        private sharedService:SharedService,
        private router: Router,
        private page_navigation: Location,
        private route:ActivatedRoute,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) { }


    ngOnInit() {




        this.route.parent.params.subscribe(

            params=>{
                this.coordinator_email= params['coordinator_email'];
            }
        );

        console.log(this.coordinator_email);


      this.sharedService.getMainDepartments()
        .subscribe(main_departments => {
            this.main_departments = main_departments;
            this.orderForm();
        },
                    (error:any) => {
                            alert("Sorry your request couldn\'t be completed due to an error.Please try again later ");
                            window.location.reload();
                    
                   this.errorMessage = < any > error});

        this.companyRegistrationForm= this.fb.group({
            name: ['', [Validators.required]],
            email: ['',],
            phone: [''],
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
            company_representative_name: [''],
            company_representative_email: [''], 
            company_representative_phone: ['']

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



    registerCompany(){
        this.registering_company = true;

        let p = Object.assign({},this.company,this.companyRegistrationForm.value);
        this.sharedService.registerCompanyAndMakeOrder(p)
            .subscribe(

                response=> {

                    if(response.operation_successful == true){
                this.registering_company = false;
                    alert("Company Successfully Registered")
                        this.company_id = response.company_id
                        this.hide_register_company = !this.hide_register_company;
                        this.hide_order_student_form = !this.hide_order_student_form

                    }



                },
                    (error:any) => {
                            alert("Sorry your request couldn\'t be completed due to an error.Please try again later ");
                            window.location.reload();
                    
                   this.errorMessage = < any > error});



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
            this.sharedService.coordinatorMakeOrder(this.orderStudentForm.value)
                .subscribe(
                    response=> {
                        if(response.operation_successful == true){

            this.placing_order_for_student = !this.placing_order_for_student;
                            alert("You made the order. Thank you"); 
                            this.hide_register_company = false;
                            this.hide_order_student_form  = true;
                            this.companyRegistrationForm.reset();
                            
                            /* calling the orderForm method again to reset the
                             * order form values to 0.
                             * If this is not done, the form maintains its old
                             * values
                             */
                            this.orderForm();

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

}
