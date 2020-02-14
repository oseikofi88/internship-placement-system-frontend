import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {SharedService } from '../../shared/services/shared.service';
import { FormBuilder,FormGroup,Validators,FormControl ,FormArray} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
    selector: 'app-manual-rejection',
    templateUrl: './manual-rejection.component.html',
    styleUrls: ['./manual-rejection.component.css']
})
export class ManualRejectionComponent implements OnInit {



    rejectPlacementForm:FormGroup;
    admin_id:any;
    errorMessage:String;
    rejecting_students:boolean = false;

    constructor(

        private fb:FormBuilder,
        private sharedService:SharedService,
        private router: Router,
        private page_navigation: Location,
        private route:ActivatedRoute,
    ) { }


    ngOnInit() {

        this.route.parent.parent.params.subscribe(

            params=>{
                this.admin_id= params['admin_id'];
            }
        );


        this.rejectPlacementForm= this.fb.group({
            studentsData : this.fb.array([this.addRows()])
        })
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
            reason_for_rejection:['',[Validators.required,Validators.maxLength(2550)]]
        })

        index_numbers.push(group)
    }

    removeStudent(index_numbers,index){
        index_numbers.controls.index_numberData.removeAt(index)
    }

    rejectStudents(){
        this.rejecting_students = true;
        if(this.rejectPlacementForm.get('studentsData').pristine){
            alert("Hmm no student has been selected to be rejected in company")
            return;
        }


        else{
            let students = this.rejectPlacementForm.get('studentsData').value;
            this.sharedService.rejectStudentsPlacedInCompany(students)
                .subscribe(response=>
                    {            
        this.rejecting_students = false;
                        if(response == true) {
                            alert("Students Placement Successfully Rejected");
                            this.router.navigate(['/admin/'+this.admin_id+'/dashboard/placement-and-rejection'])
                    } 
                    },
                    (error:any) => {
                            alert("Sorry your request couldn\'t be completed due to an error.Please try again later ");
                            window.location.reload();
                    
                   this.errorMessage = < any > error});
        }
    }
        }







