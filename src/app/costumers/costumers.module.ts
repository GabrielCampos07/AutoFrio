import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostumersRoutingModule } from './costumers-routing.module';
import { CostumersComponent } from './costumers.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CostumersComponent],
  imports: [CommonModule, CostumersRoutingModule, SharedModule],
})
export class CostumersModule {}
