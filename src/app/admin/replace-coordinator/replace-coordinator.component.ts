import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {SharedService } from '../../shared/services/shared.service';
import { AdminService } from '../admin.service'
import { FormBuilder,FormGroup,Validators,FormControl ,FormArray} from '@angular/forms';
import { Location } from '@angular/common';
import { CoordinatorDetails } from '../data-models/coordinator-details';


@Component({
  selector: 'app-replace-coordinator',
  templateUrl: './replace-coordinator.component.html',
  styleUrls: ['./replace-coordinator.component.css']
})
export class ReplaceCoordinatorComponent implements OnInit {

    replaceCoordinatorForm:FormGroup;
    errorMessage:String;
    replacing_coordinator:boolean = false;
    coordinators :CoordinatorDetails[];

    constructor(

        private fb:FormBuilder,
        private adminService:AdminService,
        private sharedService:SharedService,
        private router: Router,
        private page_navigation: Location,
        private route:ActivatedRoute,
    ) { }


    ngOnInit() {

        this.adminService.getAllCoordinators()
            .subscribe(

                coordinators=> {
                    this.coordinators= coordinators;

  });

        this.replaceCoordinatorForm= this.fb.group({
            coordinator_id : ['',[Validators.required]],
            coordinator_email: ['',[Validators.required]],
            coordinator_password: ['',[Validators.required]]
        })


  }
replaceCoordinator(){
    this.replacing_coordinator = true;
    let coordinator_id  = this.replaceCoordinatorForm.get('coordinator_id').value;
    let coordinator_email = this.replaceCoordinatorForm.get('coordinator_email').value;
    let coordinator_password =  this.replaceCoordinatorForm.get('coordinator_password').value;

        this.adminService.replaceCoordinator( coordinator_id,coordinator_email,coordinator_password)
            .subscribe(

                response=> {
                    if(response.operation_successful == true){
                        alert("New Coordinator Details Saved.");
                        this.replacing_coordinator = false;
                        this.page_navigation.back();
                    }
                    
                    } ,
                    (error:any) => {
                            alert("Sorry your request couldn\'t be completed due to an error.Please try again later ");
                            window.location.reload();
                    
                   this.errorMessage = < any > error});
        }
                    }

