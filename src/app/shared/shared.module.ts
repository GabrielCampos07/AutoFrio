import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { TableModule } from './components/table/table.module';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { SearchButtonComponent } from './components/search-button/search-button.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [MaterialModule, CommonModule],
  declarations: [FilterButtonComponent, SearchButtonComponent, FormComponent],
  exports: [
    MaterialModule,
    TableModule,
    FilterButtonComponent,
    SearchButtonComponent,
    FormsModule,
    FormComponent,
    CommonModule,
  ],
  providers: [],
})
export class SharedModule {}
