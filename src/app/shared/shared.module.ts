import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { TableModule } from './components/table/table.module';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { SearchButtonComponent } from './components/search-button/search-button.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [MaterialModule],
  declarations: [FilterButtonComponent, SearchButtonComponent],
  exports: [
    MaterialModule,
    TableModule,
    FilterButtonComponent,
    SearchButtonComponent,
    FormsModule,
  ],
  providers: [],
})
export class SharedModule {}
