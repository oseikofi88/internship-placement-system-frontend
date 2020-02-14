import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../shared/guards/auth.guard';

import { AuthenticationService } from '../shared/services/authentication.service';
import { PlacementService } from '../shared/services/placement.service';
import { AsyncValidationService } from '../shared/services/async-custom-validation-service' ;

import { ChartsModule } from 'ng2-charts';
import { SharedModule} from '../shared/modules/shared.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminService} from  './admin.service';
import { StudentService} from  '../student/student.service';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PlacementAndRejectionComponent } from './placement-and-rejection/placement-and-rejection.component'
import { ManualPlacementComponent } from './manual-placement/manual-placement.component';
import { ManualRejectionComponent } from './manual-rejection/manual-rejection.component'
import { RegisterCompanyAndMakeOrderComponent } from './register-company-and-make-order/register-company-and-make-order.component'
import { DepartmentalNumberStatisticsComponent } from './statistics/departmental-number-statistics/departmental-number-statistics.component';
import { DepartmentalStudentStatisticsComponent } from './statistics/student-statistics/departmental-student-statistics/departmental-student-statistics.component';
import { DepartmentalCompanyStatisticsComponent } from './statistics/company-statistics/departmental-company-statistics/departmental-company-statistics.component';
import { DepartmentalStudentDetailsStatisticsComponent } from './statistics/student-statistics/departmental-student-details-statistics/departmental-student-details-statistics.component';
import { DepartmentalGraphStatisticsComponent } from './statistics/departmental-graph-statistics/departmental-graph-statistics.component';
import { DepartmentalCompanyDetailsStatisticsComponent } from './statistics/company-statistics/departmental-company-details-statistics/departmental-company-details-statistics.component';

import { GeneralGraphStatisticsComponent} from '../admin/statistics/general-graph-statistics/general-graph-statistics.component';
import { AgmCoreModule } from '@agm/core';


//directions
import {GoogleMapsAPIWrapper}  from '@agm/core';
import { ReplaceCoordinatorComponent } from './replace-coordinator/replace-coordinator.component';
import { AddNewAdminComponent } from './add-new-admin/add-new-admin.component';
import { PlaceStudentsComponent } from './place-students/place-students.component';
import { AllStudentsAndTheirCompaniesComponent } from './all-students-and-their-companies/all-students-and-their-companies.component';



const adminRoutes: Routes = [
    {  path: 'admin/login', component: AdminLoginComponent},


    { path: 'admin/:admin_id/dashboard', component: AdminDashboardComponent,
        canActivate: [AuthGuard],
        children:[

            //ignore the departmental attached to the statistics
            //they are all admin statistics
            //
            //
            //

            { path: 'number-statistics' , component : DepartmentalNumberStatisticsComponent,


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

            { path: 'graph-statistics' , component : GeneralGraphStatisticsComponent},


            { path: 'all-students-and-their-companies' , component : AllStudentsAndTheirCompaniesComponent},


            { path: 'placement-and-rejection' , component : PlacementAndRejectionComponent,
                children:[
                    { path: 'manual-placement' , component : ManualPlacementComponent},
                    { path: 'manual-rejection' , component : ManualRejectionComponent},



                ]


            },

            { path: 'register-company-and-make-order' , component : RegisterCompanyAndMakeOrderComponent},

            {path: 'replace-coordinator',component: ReplaceCoordinatorComponent},


            {path: 'add-new-admin',component: AddNewAdminComponent},

            {path: 'place-or-undo-student-placement',component: PlaceStudentsComponent}

        ]
    }

]



@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        ChartsModule,
        RouterModule.forChild(adminRoutes),
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyCIoWVrkxH9CYINjbUfGow81m2hZZgCsQY",
            libraries: ["places"]
        })
    ],
    declarations: [AdminLoginComponent, AdminHomepageComponent, 
        AdminDashboardComponent,ManualPlacementComponent,
        ManualRejectionComponent,RegisterCompanyAndMakeOrderComponent,
        DepartmentalNumberStatisticsComponent,
        GeneralGraphStatisticsComponent,
        PlacementAndRejectionComponent,
        DepartmentalGraphStatisticsComponent,
        DepartmentalStudentStatisticsComponent,DepartmentalStudentDetailsStatisticsComponent,DepartmentalCompanyStatisticsComponent,DepartmentalCompanyDetailsStatisticsComponent, ReplaceCoordinatorComponent, AddNewAdminComponent, PlaceStudentsComponent, AllStudentsAndTheirCompaniesComponent],
    providers:[ AuthenticationService ,AuthGuard,PlacementService,AdminService,StudentService,AsyncValidationService],
    exports: [AdminHomepageComponent]
})
export class AdminModule { }
