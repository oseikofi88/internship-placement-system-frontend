import { Component, OnInit } from '@angular/core';
import { AdminService } from './../admin.service';

@Component({
  selector: 'app-place-students',
  templateUrl: './place-students.component.html',
  styleUrls: ['./place-students.component.css']
})
export class PlaceStudentsComponent implements OnInit {

    loading_data: boolean = false;
	errorMessage:String;
  constructor(
        private adminService:AdminService,
  
  ) { }

  ngOnInit() {
  }


    placeStudents():void{
    window.open("api.coeinternship.com/admin/place-students", "_blank");

    }
    //
    //
    undoAllPlacement():void{

                    this.loading_data =  true;
                    this.adminService.undoStudentPlacement() 
                    .subscribe( response =>
                {            
                    this.loading_data =  false;
                    alert("All Placement undone");
                } ,
                error => this.errorMessage = < any > error);
    
    }


    }


