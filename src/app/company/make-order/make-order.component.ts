import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService} from '../../company/company.service';

import { MainDepartment } from '../../shared/interfaces/main-department';

import { CompanyDetails} from '../../company/data-models/company-details';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { SharedService} from '../../shared/services/shared.service';
import { FormBuilder,FormGroup,Validators ,FormArray,FormControl} from '@angular/forms';



@Component({
    selector: 'app-make-order',
    templateUrl: './make-order.component.html',
    styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit {

    returnUrl :string;
    company_id: number;
    errorMessage:string;
    company: CompanyDetails;
    main_departments : MainDepartment[];

    orderStudentForm:FormGroup;
    order_form:boolean = false;
    orderingform:FormGroup;

    placement_done:boolean= false;
    placing_order_for_student:boolean = false; 

    constructor(private fb:FormBuilder,
        private route: ActivatedRoute,
        private authenticationService : AuthenticationService,
        private companyService: CompanyService,
        private sharedService: SharedService,
        private router: Router) { }

    ngOnInit() {
        this.authenticationService.companyLogout();

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.sharedService.getMainDepartments()
            .subscribe(main_departments => {
                this.main_departments = main_departments;
                this.orderForm();
            },
                error => this.errorMessage = < any > error);




        this.route.parent.params.subscribe(
            params=>{
                this.company_id= +params['company_id'];
            }
        );

        this.sharedService.getPlacementStatus()
            .subscribe(response=> { 
                if(response.placement_done== 1){
                    this.placement_done = !this.placement_done;

                }

            },

                error => this.errorMessage = < any > error);

        this.companyService.getCompanyDetails(this.company_id)
            .subscribe(company => { 
                this.company = company;
                if(this.company[0].order_made == 1){
                    this.order_form = !this.order_form;
                    this.orderForm();

                }

            },

                error => this.errorMessage = < any > error);

    }

    orderForm(){
        this.orderStudentForm = this.fb.group({
            company_id : [this.company_id],
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
        console.log(this.orderStudentForm.value);
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
            this.companyService.companyMakeOrder(this.orderStudentForm.value)
                .subscribe(
                    response=> {
                        if(response.operation_successful === true){
                            alert("You made the order. Thank you"); 
                            this.order_form = !this.order_form;
            this.placing_order_for_student = !this.placing_order_for_student;

                            if(response.placement_status == 1){
                                this.placement_done = !this.placement_done;	

                            }

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
