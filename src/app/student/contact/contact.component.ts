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

index_number: number;
errorMessage:String;

concernForm:FormGroup;
sending_email:boolean = false;


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
              this.index_number  = +params['index_number'];
          }
      );
        


		this.concernForm= this.fb.group({
            index_number:[this.index_number],
			concern_title: ['', [Validators.required,Validators.maxLength(70)]],
			concern_message: ['', [Validators.required, Validators.maxLength(5000)]],
		}); 



  }



fileConcern():void{
    let concern = this.concernForm.value;
    this.sending_email = !this.sending_email
              this.sharedService.fileConcernToCoordinator(concern)
      .subscribe(response=>{
          if(response.operation_successful === true){
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
