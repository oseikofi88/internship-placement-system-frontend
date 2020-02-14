import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {SharedService } from '../../shared/services/shared.service';
import { AdminService } from '../admin.service'
import { AsyncValidationService }  from '../../shared/services/async-custom-validation-service'
import { FormBuilder,FormGroup,Validators,FormControl ,FormArray} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-new-admin',
  templateUrl: './add-new-admin.component.html',
  styleUrls: ['./add-new-admin.component.css']
})
export class AddNewAdminComponent implements OnInit {

    addAdminForm:FormGroup;
    errorMessage:String;
    adding_new_admin:boolean = false;

    constructor(

        private fb:FormBuilder,
        private adminService:AdminService,
        private sharedService:SharedService,
        private router: Router,
        private asyncValidationService:AsyncValidationService,
        private page_navigation: Location,
        private route:ActivatedRoute

    ) { }


    ngOnInit() {

        this.addAdminForm= this.fb.group({
            admin_username: ['',[Validators.required],this.asyncValidationService.checkIfAdminUserNameAlreadyExist.
                bind(this.asyncValidationService)],
            admin_password: ['',[Validators.required]]
        })

}

addAdmin(){
    this.adding_new_admin = true;
    let admin_username = this.addAdminForm.get('admin_username').value;
    let admin_password= this.addAdminForm.get('admin_password').value;
        this.adminService.addNewAdmin(admin_username,admin_password)
            .subscribe(

                response=> {
                    if(response.operation_successful == true){
                        this.adding_new_admin = false;
                        alert("New Admin Details Saved.")
                        this.page_navigation.back();
                    }
                    
                    } ,
                    (error:any) => {
                            alert("Sorry your request couldn\'t be completed due to an error.Please try again later ");
                            window.location.reload();
                    
                   this.errorMessage = < any > error});
        }
                    }






