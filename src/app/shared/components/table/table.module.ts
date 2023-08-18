import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableHeaderComponent } from './components/header.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableItemDirective } from './components/table-item.directive';

@NgModule({
  declarations: [TableComponent, TableHeaderComponent, TableItemDirective],
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  exports: [TableComponent, TableHeaderComponent, TableItemDirective],
})
export class TableModule {}
