import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AgmCoreModule } from '@agm/core';
import { AuthenticationService } from '../shared/services/authentication.service';

//directions
import {GoogleMapsAPIWrapper}  from '@agm/core';
import { SharedModule} from '../shared/modules/shared.module';

import { PlacementService } from '../shared/services/placement.service';
import { CompanyRegistrationComponent } from '../company/company-registration/company-registration.component';
import { CompanyHomepageComponent } from './company-homepage/company-homepage.component';
import { CompanyService } from './company.service';
import { CompanyLoginComponent } from './company-login/company-login.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { MakeOrderComponent } from './make-order/make-order.component';
import { StudentsPlacedInCompanyComponent } from './students-placed-in-company/students-placed-in-company.component';
import { SocialComponent } from './social/social.component';
import { PlacementNotDoneComponent } from './placement-not-done/placement-not-done.component';
import { ContactComponent } from './contact/contact.component';




const companyRoutes: Routes = [

    {  path: 'company/register', component: CompanyRegistrationComponent  },

    {  path: 'company/login', component: CompanyLoginComponent},

    { path:'company', component: CompanyHomepageComponent,

    },

    { path: 'company/:company_id/dashboard', component: CompanyDashboardComponent,
        canActivate: [AuthGuard],
        children:[

            { path: 'make-order' , component : MakeOrderComponent},

            { path: 'students-placed-in-company' , component : StudentsPlacedInCompanyComponent},


            { path: 'social' , component : SocialComponent},
            { path: 'placement-not-done' , component : PlacementNotDoneComponent},

            {path: 'contact', component: ContactComponent}
        ]
    }

];

@NgModule({
    declarations: [CompanyRegistrationComponent, CompanyHomepageComponent, CompanyLoginComponent, CompanyDashboardComponent, MakeOrderComponent, StudentsPlacedInCompanyComponent, SocialComponent, PlacementNotDoneComponent, ContactComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule, 
        SharedModule,
        RouterModule.forChild(companyRoutes),
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyCIoWVrkxH9CYINjbUfGow81m2hZZgCsQY",
            libraries: ["places"]
        }),
    ],

    providers:[ CompanyService,AuthenticationService ,AuthGuard,PlacementService],
    exports:[CompanyHomepageComponent]
})

export class CompanyModule { }
