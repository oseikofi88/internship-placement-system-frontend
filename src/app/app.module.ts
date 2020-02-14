import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,ModuleWithProviders} from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule ,Routes} from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule} from './shared/modules/shared.module';


import {SharedService } from './shared/services/shared.service';
import { NavbarService } from './shared/services/navbar.service';
import { NavbarComponent} from './shared/components/navbar/navbar.component';

import { HomePageComponent } from './home-page/home-page.component';
 

const homepageRoutes:Routes = [
         { path: '' , redirectTo: 'home',pathMatch: 'full' },
          { path: '**' , redirectTo: 'home',pathMatch: 'full' }      ,

          {path:'', loadChildren:'./student/student.module#StudentModule'},
          {path:'', loadChildren:'./company/company.module#CompanyModule'},
          {path:'', loadChildren:'./admin/admin.module#AdminModule'},
          {path:'', loadChildren:'./coordinator/coordinator.module#CoordinatorModule'},
	  ]


const routing: ModuleWithProviders = RouterModule.forRoot(homepageRoutes)

@NgModule({
  declarations: [
      HomePageComponent,
      NavbarComponent,
  ],




  imports: [
    BrowserModule,
      HttpModule,
      routing
      // StudentModule,
	  // CompanyModule,
      // AdminModule,
      // CoordinatorModule,
        // RouterModule.forChild(routing),
    
  ],





    providers: [SharedService,NavbarService],



  
  bootstrap: [ HomePageComponent ] })
export class AppModule { }
