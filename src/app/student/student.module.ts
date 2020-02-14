import { NgModule ,ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule ,Routes} from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';


import { StudentService } from './student.service'


import { AgmCoreModule } from '@agm/core';
import { AsyncValidationService } from '../shared/services/async-custom-validation-service' ;
import { StudentRegistrationComponent } from '../student/student-registration/student-registration.component';
import { StudentHomepageComponent } from './student-homepage/student-homepage.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { CompanyService } from '../company/company.service';


import { AuthenticationService } from '../shared/services/authentication.service';
import { StudentDashboardComponent } from '../student/student-dashboard/student-dashboard.component';
import { PlacementNotDoneComponent } from '..//student/placement-not-done/placement-not-done.component';
import { PlacementDoneStudentNotPlacedComponent } from '../student/placement-done-student-not-placed/placement-done-student-not-placed.component';
import { PlacementDoneStudentPlacedComponent } from '../student/placement-done-student-placed/placement-done-student-placed.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { SocialComponent } from '../student/social/social.component';
import { PlacementStatusComponent } from '../student/placement-status.component';
import { PlacementService } from '../shared/services/placement.service';
import { StudentGotCompanyAlreadyComponent } from './student-got-company-already/student-got-company-already.component';



//directions
import {GoogleMapsAPIWrapper}  from '@agm/core';
import { StudentHasStartedInternshipComponent } from '../student/student-has-started-internship/student-has-started-internship.component';
import { StudentSearchedForOwnCompanyComponent } from '../student/student-searched-for-own-company/student-searched-for-own-company.component';
import { StudentOrderForCompanyComponent } from '../student/student-order-for-company/student-order-for-company.component';


import { SharedModule} from '../shared/modules/shared.module';
import { IntroductoryLetterComponent } from './letters/introductory-letter/introductory-letter.component';
import { AcceptanceLetterComponent } from './letters/acceptance-letter/acceptance-letter.component';
import { ConfidentialAppraisalFormsComponent } from './letters/confidential-appraisal-forms/confidential-appraisal-forms.component';
import { LogSheetComponent } from './letters/log-sheet/log-sheet.component';
import { GetAppraisalFormAndLogsheetComponent } from './get-appraisal-form-and-logsheet/get-appraisal-form-and-logsheet.component';
import { ContactComponent } from './contact/contact.component';
import { RejectPlacementComponent } from './reject-placement/reject-placement.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';




const studentRoutes: Routes = [
    { path:'student', component:StudentHomepageComponent },

    {  path: 'student/login', component: StudentLoginComponent},

    {  path: 'student/register', component: StudentRegistrationComponent },

    {  path: 'student/:encrypted_key/reset-password', component: PasswordRecoveryComponent},


    { path: 'student/:index_number/dashboard', component: StudentDashboardComponent,
        canActivate: [AuthGuard],

        children:[

            {path: 'get-appraisal-form-and-logsheet', component : GetAppraisalFormAndLogsheetComponent ,
                children:[


                    { path: 'student-has-started-internship', component : StudentHasStartedInternshipComponent } ]
            },

            {path: 'edit-profile', component: EditProfileComponent },

            {path: 'introductory-letter-download', component: IntroductoryLetterComponent},

            {path: 'acceptance-letter-download', component: AcceptanceLetterComponent},

            {path: 'confidential-appraisal-form-download' , component: ConfidentialAppraisalFormsComponent},

            {path: 'log-sheet-download', component:LogSheetComponent},

            { path: 'placement-not-done' , component : PlacementNotDoneComponent },


            { path: 'placement-done-student-not-placed', component : PlacementDoneStudentNotPlacedComponent},


            {path: 'student-searched-for-own-company', component: StudentSearchedForOwnCompanyComponent },


            { path: 'placement-done-student-placed', component : PlacementDoneStudentPlacedComponent 
            },

            { path: 'student-got-company-already', component : StudentGotCompanyAlreadyComponent,

                children: [ 
                    {path: 'student-searched-for-own-company', component: StudentSearchedForOwnCompanyComponent }

                ]
            },


            { path: 'company-details', component : CompanyDetailsComponent },


            { path: 'social', component: SocialComponent },

            { path: 'contact', component: ContactComponent}

        ]
    }


]

const routing: ModuleWithProviders = RouterModule.forChild(studentRoutes)


@NgModule({
    declarations: [
        StudentRegistrationComponent,
        StudentHomepageComponent,
        StudentLoginComponent,
        StudentDashboardComponent,
        PlacementNotDoneComponent,
        PlacementDoneStudentNotPlacedComponent,
        PlacementDoneStudentPlacedComponent,
        SocialComponent,
        PlacementStatusComponent,
        StudentGotCompanyAlreadyComponent,
        StudentHasStartedInternshipComponent,
        StudentSearchedForOwnCompanyComponent,
        StudentOrderForCompanyComponent,
        IntroductoryLetterComponent,
        AcceptanceLetterComponent,
        ConfidentialAppraisalFormsComponent,
        LogSheetComponent,
        GetAppraisalFormAndLogsheetComponent,
        ContactComponent,
        RejectPlacementComponent,
        EditProfileComponent,
         CompanyDetailsComponent,
        PasswordRecoveryComponent,
    ],


    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        routing, 
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyCIoWVrkxH9CYINjbUfGow81m2hZZgCsQY",
            libraries: ["places"]
        }),

    ],
    providers: [ CompanyService,StudentService,AsyncValidationService, AuthenticationService,AuthGuard,PlacementService,GoogleMapsAPIWrapper,{ provide: 'Window',  useValue: window }],

    exports:[StudentHomepageComponent]

})


export class StudentModule { }
