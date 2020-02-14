import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SharedService } from '../../shared/services/shared.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder,FormGroup,Validators,FormControl } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

concernForm:FormGroup;
company_id:number;

sending_email: boolean = false;

errorMessage:String;

constructor(
  private sharedService: SharedService,
   private  router : Router,
    private fb:FormBuilder,
    private page_navigation: Location,
  private route: ActivatedRoute,
  ) {}

  ngOnInit() {

      this.route.parent.params.subscribe(
          params=>{
              this.company_id  = +params['company_id'];
          }
      );
		this.concernForm= this.fb.group({
            company_user_id:[this.company_id],
			concern_title: ['', [Validators.required,Validators.maxLength(70)]],
			concern_message: ['', [Validators.required, Validators.maxLength(5000)]],
		}); 



  }



fileConcern():void{
    let concern = this.concernForm.value;
    this.sending_email = !this.sending_email;
              this.sharedService.fileConcernToCoordinator(concern)
      .subscribe(response=>{
          if(response.operation_successful === true){
              this.sending_email = !this.sending_email;
              this.concernFiledSuccessFul();

          }
      },
        error => this.errorMessage = < any > error);

}


    concernFiledSuccessFul(): void{
          alert("Your Complaint Has Been Forwarded To You Coordinator");
        this.page_navigation.back();



    }


}
