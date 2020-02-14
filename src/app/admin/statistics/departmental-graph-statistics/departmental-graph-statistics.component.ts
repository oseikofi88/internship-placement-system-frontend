import { Component, OnInit } from '@angular/core';
import {SharedService } from '../../../shared/services/shared.service';
import { GeneralStudentGraphStatistics} from '../../../shared/interfaces/general-student-graph-statistics';
import { GeneralCompanyGraphStatistics} from '../../../shared/interfaces/general-company-graph-statistics';
import { Router,ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-departmental-graph-statistics',
  templateUrl: './departmental-graph-statistics.component.html',
  styleUrls: ['./departmental-graph-statistics.component.css']
})
export class DepartmentalGraphStatisticsComponent implements OnInit {

    student_statistics:GeneralStudentGraphStatistics[];
    company_statistics:GeneralCompanyGraphStatistics[];


    coordinator_id:number;
        //bar graph data
    main_department_names:string[] = [];
    number_that_wanted_placement:any[]=[];
    number_that_was_placed:any[]=[];
    number_that_was_not_placed:any[]=[];

    //pie chart data
    first_twenty_company_names:string[] = [];
    number_ordered_for:any[] = [];
    percentage_taken:any[] = [];
	
	percentage_left:any;
    loops:string[] =['first','second']

	listed_companies = this.first_twenty_company_names;
	numbers = [111, 222 ,51,4,3];

	errorMessage:String;

        constructor(
        private sharedService:SharedService,

   private  router : Router,
  private route: ActivatedRoute,
        ){}


    ngOnInit(){
      this.route.parent.params.subscribe(

          params=>{
              this.coordinator_id= params['coordinator_id'];
              console.log(this.coordinator_id);
          }
      );
    
      this.sharedService.getDepartmentalStudentGraphStatistics(this.coordinator_id) 
        .subscribe(statistics=>
            {            
                this.student_statistics = statistics;
                this.bargraphDetails();
                this.getCompanyGraphStatisticsDetails();
            } ,
            error => this.errorMessage = < any > error);
    }


    bargraphDetails():void{

        this.student_statistics.forEach(student_statistics =>{
            this.main_department_names.push(student_statistics.main_department);
            this.number_that_wanted_placement.push(student_statistics.want_placement);
            this.number_that_was_placed.push(student_statistics.placed_by_college);
            this.number_that_was_not_placed.push(student_statistics.not_placed_by_college);

        
        }); 
        
        
    
    }

    getCompanyGraphStatisticsDetails():void{
      this.sharedService.getDepartmentalCompanyGraphStatistics(this.coordinator_id) 
        .subscribe(statistics=>
            {            
                this.company_statistics = statistics;
                this.piechartDetails();
    
    });
    }

                piechartDetails():void{

					var sum_of_percentage_taken:number = 0;
                    this.company_statistics.forEach(company_statistics=>{
                        this.first_twenty_company_names.push(company_statistics.company_name.concat("-").concat(company_statistics.company_district).concat(",").concat(company_statistics.company_region));
                        this.number_ordered_for.push(+company_statistics.number_ordered_for);
                        this.percentage_taken.push(+company_statistics.percentage_taken);

                    
                    });

                
                }


  // Doughnut
  public doughnutChartLabels:string[] = this.first_twenty_company_names;
  public doughnutChartData:number[] = this.percentage_taken;
  public doughnutChartType:string = 'doughnut';
public chartColors: any[] = [
      { 
        backgroundColor:[
			"#FFA07A",
			"#F08080",
			"#8B0000",
			"#FF4500",
			"#FF8C00",
			"#FFFFE0",
			"#FFDAB9",
			"#BDB76B",
			"#7CFC00"
		]
			



      }];
 
  // events
 




public barChartOptions:any = {
    scaleShowVerticalLines: true,
scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }],
    xAxes: [{
      ticks: {
        autoSkip: false
      }
    }]
  },
    responsive: true
  };
  public barChartLabels:string[] = this.main_department_names;
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: this.number_that_wanted_placement, label: 'No Registered & Wanted Placement'},
    {data:this.number_that_was_placed, label: 'No Placed'},
    {data: this.number_that_was_not_placed , label: 'No Not Placed'}
  ];
 
 
}
