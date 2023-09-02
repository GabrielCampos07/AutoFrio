import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartsRoutingModule } from './parts-routing.module';
import { PartsComponent } from './parts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsComponent } from './forms/forms.component';

@NgModule({
  declarations: [PartsComponent, FormsComponent],
  imports: [CommonModule, PartsRoutingModule, SharedModule],
})
export class PartsModule {}
