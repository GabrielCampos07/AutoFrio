import { NgModule } from '@angular/core';

import { CostumersRoutingModule } from './costumers-routing.module';
import { CostumersComponent } from './costumers.component';
import { SharedModule } from '../../shared/shared.module';
import { CepPipe } from './shared/pipes/cep.pipe';
import { DocumentPipe } from './shared/pipes/document.pipe';
import { PhonePipe } from './shared/pipes/phone.pipe';

@NgModule({
  declarations: [CostumersComponent, CepPipe, DocumentPipe, PhonePipe],
  imports: [CostumersRoutingModule, SharedModule],
})
export class CostumersModule {}
