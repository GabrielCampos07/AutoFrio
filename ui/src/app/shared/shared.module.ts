import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { TableModule } from './components/table/table.module';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { NgxMaskModule } from 'ngx-mask';
import { DocumentPipe } from './pipes/document.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { CepPipe } from './pipes/cep.pipe';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    FilterButtonComponent,
    FormComponent,
    InputComponent,
    DocumentPipe,
    PhonePipe,
    CepPipe,
  ],
  exports: [
    MaterialModule,
    TableModule,
    FilterButtonComponent,
    FormComponent,
    CommonModule,
    InputComponent,
    FormsModule,
    NgxMaskModule,
    DocumentPipe,
    PhonePipe,
    CepPipe,
  ],
  providers: [],
})
export class SharedModule {}
