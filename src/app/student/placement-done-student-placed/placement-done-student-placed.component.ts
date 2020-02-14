import { Component, OnInit ,Input,Inject } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl } from '@angular/forms';

import { StudentDetails } from '../../student/data-models/student-details';
import { StudentService} from '../student.service'
import { Router,ActivatedRoute } from '@angular/router';




@Component({
    selector: 'app-placement-done-student-placed',
    templateUrl: './placement-done-student-placed.component.html',
    styleUrls: ['./placement-done-student-placed.component.css']
})



export class PlacementDoneStudentPlacedComponent implements OnInit {



    formData:FormData;
    file: File;
    index_number: number; student : StudentDetails 
    errorMessage:String;
    year:any;

    hide_content:boolean = false;
    hide_update_details:boolean = true;
    started_internship_button:boolean = false;
    upload_acceptance_letter_button:boolean =false;
    upload_acceptance_letter_instruction:boolean =false;
    upload_form:boolean= true;
    student_rejecting_placement:boolean = false;
    rejecting_placement : boolean = false;

    acceptanceLetterForm:FormGroup;
    rejectPlacementForm:FormGroup;

    constructor(
        private fb:FormBuilder,
        private studentService: StudentService,
        private  router : Router,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {

        this.route.parent.params.subscribe(
            params=>{
                this.index_number  = +params['index_number'];
            }
        );

        this.studentService.getStudentDetails(this.index_number)
            .subscribe(student => {

                this.student= student ;
                if(this.student[0].time_of_starting_internship != null){
                    this.started_internship_button = !this.started_internship_button;
                }
                if(this.student[0].acceptance_letter_url === null  && this.student[0].registered_company == true){
                this.upload_acceptance_letter_instruction = !this.upload_acceptance_letter_instruction;
                    this.upload_acceptance_letter_button = !this.upload_acceptance_letter_button;
                }
            },
                error => this.errorMessage = < any > error);

        this.acceptanceLetterForm = this.fb.group({
            index_number:[this.index_number],
            acceptance_letter:['',[Validators.required]]
        })

        this.rejectPlacementForm = this.fb.group({
            reason_for_rejection:['',[Validators.required,Validators.maxLength(2550)]]
                
        })


        var date = new Date();
        this.year = date.getFullYear();

    }


    getAcceptanceLetter():void{
        this.router.navigate(['/student/'+this.index_number+'/dashboard/acceptance-letter-download']);

    }

    getInternshipForms():void{
        this.router.navigate(['/student/'+this.index_number+'/dashboard/get-appraisal-form-and-logsheet']);

    }



    startedInternship():void{
        this.studentService.registerTimeStudentStartedInternship(this.index_number)
        .subscribe(response => {
            if(response.operation_successful === true){

                alert("Your time of start has been successfully recorded")
            }
            this.started_internship_button =  !this.started_internship_button;
            if(this.student[0].acceptance_letter_url === null && this.student[0].registered_company == 1){
                this.upload_acceptance_letter_button = !this.upload_acceptance_letter_button;
            } 
        },

            error => this.errorMessage = < any > error);



    } 

    showUploadLetterForm():void{
        this.upload_form = !this.upload_form;

    }

    fileChange(event){
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            this.formData= new FormData();
            this.formData.append('uploadFile', file, file.name);
            this.acceptanceLetterForm.patchValue({acceptance_letter: this.formData});
        }

    }

    uploadAcceptanceLetter():void{

        let input = JSON.stringify(this.acceptanceLetterForm.value);

        this.formData.append("input",input);

        this.studentService.uploadAcceptanceLetter(this.formData)
        .subscribe(response => {
            if(response.operation_successful === true){

                alert("Nice You Have uploaded your letter");
            }
            this.upload_acceptance_letter_button = !this.upload_acceptance_letter_button;

        },

            error => this.errorMessage = < any > error);

    }

    reasonForRejection():void{
        this.student_rejecting_placement = !this.student_rejecting_placement;
        
    }

    rejectPlacement():void{
        if(window.confirm("Before you proceed,please make sure that. \n1.You have a firm already willing to take you as an intern.\n\n2.This will undo your college placement to enable you register your new found company. \n\n3. Your department's internship coordinator is aware that you are changing.")){
        



        this.rejecting_placement = true;
            let index_number = this.index_number;
            let reason_for_rejection  = this.rejectPlacementForm.get('reason_for_rejection').value;
        this.studentService.rejectPlacement(index_number,reason_for_rejection)
            .subscribe(response=> {
                console.log(response);
                if(response.operation_successful == true){
                this.rejecting_placement = false;
                this.router.navigate(['/student/'+index_number+'/dashboard/student-got-company-already']);
                }
                else{
                

		alert('hmmm your request couldn\'t be completed,Please try again later');
                }
        },

    error => {
		alert('hmmm your request couldn\'t be completed,Please try again later');
        console.log(error);

    });


        };

            
    }
uploadConfirmationLetter():void{
                this.upload_acceptance_letter_button = !this.upload_acceptance_letter_button;
}

}

