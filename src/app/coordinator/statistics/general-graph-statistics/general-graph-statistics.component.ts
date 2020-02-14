import { Component, OnInit ,ViewChild} from '@angular/core';
import {SharedService } from '../../../shared/services/shared.service';
import { GeneralStudentGraphStatistics} from '../../../shared/interfaces/general-student-graph-statistics';
import { GeneralCompanyGraphStatistics} from '../../../shared/interfaces/general-company-graph-statistics';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';



@Component({
  selector: 'app-general-graph-statistics',
  templateUrl: './general-graph-statistics.component.html',
  styleUrls: ['./general-graph-statistics.component.css']
})
export class GeneralGraphStatisticsComponent {


    student_statistics:GeneralStudentGraphStatistics[];
    company_statistics:GeneralCompanyGraphStatistics[];


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

	listed_companies = this.first_twenty_company_names;
	numbers = [111, 222 ,51,4,3];

    hide_sidebar:boolean = true;

	errorMessage:String;
    @ViewChild(BaseChartDirective)
    public chart: BaseChartDirective; // Now you can reference your chart via `this.chart`


        constructor(
        private sharedService:SharedService

        ){}


    ngOnInit(){
    
      this.sharedService.getGeneralStudentGraphStatistics() 
        .subscribe(statistics=>
            {            
                this.student_statistics = statistics;
            setTimeout(()=>{ 
                this.bargraphDetails();
                this.getCompanyGraphStatisticsDetails();

            },2000)
            } ,
            error => this.errorMessage = < any > error);
    }

    hideSidebar():void{
        this.hide_sidebar = !this.hide_sidebar;

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
      this.sharedService.getGeneralCompanyGraphStatistics() 
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
			"#7CFC00",
			"#32CD32",
			"#006400",
			"#00FF7F",
			"#3CB371",
			"#556B2F",
			"#E0FFFF",
			"#48D1CC",
			"#ADD8E6",
			"#1E90FF",
			"#4169E1",
			"#191970",
			"#483D8B",
			"#FF1493",
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
