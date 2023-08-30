import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { PartsModule } from './parts/parts.module';
import { CostumersModule } from './costumers/costumers.module';

@NgModule({
  imports: [CommonModule, SharedModule, PartsModule, CostumersModule],
  declarations: [],
})
export class AdministrativeModule {}
