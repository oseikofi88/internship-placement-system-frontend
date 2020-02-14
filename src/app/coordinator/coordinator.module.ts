import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AsyncValidationService } from '../shared/services/async-custom-validation-service' ;
import { StudentService } from '../student/student.service';


import { ChartsModule } from 'ng2-charts';

import { CoordinatorLoginComponent } from './coordinator-login/coordinator-login.component';
import { SharedModule} from '../shared/modules/shared.module';
import { CoordinatorDashboardComponent } from './coordinator-dashboard/coordinator-dashboard.component';
import { GeneralNumberStatisticsComponent } from '../coordinator/statistics/general-number-statistics/general-number-statistics.component';
import { DepartmentalNumberStatisticsComponent } from '../coordinator/statistics/departmental-number-statistics/departmental-number-statistics.component';
import { GeneralGraphStatisticsComponent} from '../coordinator/statistics/general-graph-statistics/general-graph-statistics.component';
import { GeneralStudentStatisticsComponent } from '../coordinator/statistics/general-student-statistics/general-student-statistics.component';
import { GeneralCompanyStatisticsComponent } from '../coordinator/statistics/general-company-statistics/general-company-statistics.component';
import { DepartmentalStudentStatisticsComponent } from '../coordinator/statistics/departmental-student-statistics/departmental-student-statistics.component';
import { DepartmentalCompanyStatisticsComponent } from '../coordinator/statistics/departmental-company-statistics/departmental-company-statistics.component';
import { DepartmentalStudentDetailsStatisticsComponent } from '../coordinator/statistics/departmental-student-details-statistics/departmental-student-details-statistics.component';
import { DepartmentalGraphStatisticsComponent } from '../coordinator/statistics/departmental-graph-statistics/departmental-graph-statistics.component';
import { DepartmentalCompanyDetailsStatisticsComponent } from '../coordinator/statistics/departmental-company-details-statistics/departmental-company-details-statistics.component';
// import { CompanyDetailsComponent } from '../coordinator/company-details/company-details.component';
import { PlacementAndRejectionComponent } from '../coordinator/placement-and-rejection/placement-and-rejection.component'
import { ManualPlacementComponent } from '../coordinator/manual-placement/manual-placement.component';
import { ManualRejectionComponent } from '../coordinator/manual-rejection/manual-rejection.component'
import { RegisterCompanyAndMakeOrderComponent } from '../coordinator/register-company-and-make-order/register-company-and-make-order.component'


//directions
import { AgmCoreModule } from '@agm/core';


//directions
import {GoogleMapsAPIWrapper}  from '@agm/core';

const coordinatorRoutes: Routes = [


    {  path: 'coordinator', component: CoordinatorLoginComponent},



    { path: 'coordinator/:coordinator_id/dashboard', component: CoordinatorDashboardComponent,
        canActivate: [AuthGuard],
        children:[


            { path: 'general-number-statistics' , component : GeneralNumberStatisticsComponent,

                children:[
                    { path: 'student-statistics' , component : GeneralStudentStatisticsComponent  },

                    { path: 'company-statistics' , component : GeneralCompanyStatisticsComponent},
                ] 
            },


            { path: 'departmental-number-statistics' , component : DepartmentalNumberStatisticsComponent,


                children:[
                    { path: 'student-statistics' , component : DepartmentalStudentStatisticsComponent,

                        children:[
                            { path: 'students-details/:sub_department_id' , component : DepartmentalStudentDetailsStatisticsComponent
                            }
                        ]
                    },

                    { path: 'company-statistics' , component : DepartmentalCompanyStatisticsComponent,

                        children:[
                            { path: 'company-details/:company_id' , component :DepartmentalCompanyDetailsStatisticsComponent },

                            // { path: 'company-registration-details', component : CompanyDetailsComponent },
                        ]
                    },
                ] 
            },

            { path: 'general-graph-statistics' , component : GeneralGraphStatisticsComponent},
            { path: 'departmental-graph-statistics' , component : DepartmentalGraphStatisticsComponent},

            { path: 'placement-and-rejection' , component : PlacementAndRejectionComponent,
                children:[
            { path: 'manual-placement' , component : ManualPlacementComponent},
            { path: 'manual-rejection' , component : ManualRejectionComponent},

                
                
                ]
            
            
            },

            { path: 'register-company-and-make-order' , component : RegisterCompanyAndMakeOrderComponent},

        ],
    }

]
@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        ReactiveFormsModule, 
        RouterModule.forChild(coordinatorRoutes),
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyCIoWVrkxH9CYINjbUfGow81m2hZZgCsQY",
            libraries: ["places"]
        }),
        ChartsModule
    ],
    declarations: [CoordinatorLoginComponent, CoordinatorDashboardComponent,
        GeneralNumberStatisticsComponent,
        DepartmentalNumberStatisticsComponent,GeneralGraphStatisticsComponent,GeneralStudentStatisticsComponent,
        GeneralCompanyStatisticsComponent,DepartmentalStudentStatisticsComponent,DepartmentalCompanyStatisticsComponent,DepartmentalStudentDetailsStatisticsComponent, 
        DepartmentalGraphStatisticsComponent,
        DepartmentalCompanyDetailsStatisticsComponent,
        // CompanyDetailsComponent
        PlacementAndRejectionComponent,
        ManualPlacementComponent,
        ManualRejectionComponent,
        RegisterCompanyAndMakeOrderComponent



    ],
    providers:[ AuthenticationService ,AuthGuard,AsyncValidationService,StudentService,],

    exports:[CoordinatorLoginComponent]
})
export class CoordinatorModule { }
