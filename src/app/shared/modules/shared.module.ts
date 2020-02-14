import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectionsMapDirective } from '../directives/directions-map.directive';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DirectionsMapDirective],

    exports:[DirectionsMapDirective]
})
export class SharedModule { }
