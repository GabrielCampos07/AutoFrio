import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostumersComponent } from './costumers/costumers.component';
import { PartsComponent } from './parts/parts.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CostumersComponent, PartsComponent],
})
export class AdministrativeModule {}
