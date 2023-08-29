import { NgModule } from '@angular/core';

import { CostumersRoutingModule } from './costumers-routing.module';
import { CostumersComponent } from './costumers.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CostumersComponent],
  imports: [CostumersRoutingModule, SharedModule],
})
export class CostumersModule {}
