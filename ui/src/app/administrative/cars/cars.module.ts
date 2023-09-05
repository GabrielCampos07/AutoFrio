import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CarsComponent],
  imports: [CommonModule, CarsRoutingModule, SharedModule],
})
export class CarsModule {}
