import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartsRoutingModule } from './parts-routing.module';
import { PartsComponent } from './parts.component';


@NgModule({
  declarations: [
    PartsComponent
  ],
  imports: [
    CommonModule,
    PartsRoutingModule
  ]
})
export class PartsModule { }
