import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { TableModule } from './components/table/table.module';

@NgModule({
  imports: [MaterialModule],
  declarations: [],
  exports: [MaterialModule, TableModule],
  providers: [],
})
export class SharedModule {}
