import {
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewChild,
} from '@angular/core';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { TableHeaderComponent } from './components/header.component';
import { TableItemDirective } from './components/table-item.directive';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() data: unknown[] = [];

  @Input() pageSizeOptions = [10, 25, 50];

  @Input() length: number = 0;

  @ContentChildren(TableHeaderComponent)
  protected headers?: QueryList<TableHeaderComponent>;

  @ContentChildren(TableItemDirective, { descendants: true })
  protected bodys: QueryList<TableItemDirective> =
    new QueryList<TableItemDirective>();

  protected dataSource: MatTableDataSource<any> = new MatTableDataSource();

  protected headerProcessed: TableHeaderComponent[] = [];
  protected bodysProcessed: TableItemDirective[] = [];

  protected displayedColumns: string[] = [];

  @ViewChild(MatPaginator) private paginator!: MatTableDataSourcePaginator;

  constructor() {}

  protected ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  protected ngAfterViewInit() {
    this.bodysProcessed = this.bodys.map((body) => body);
    this.headerProcessed = this.headers!.map((header) => header);

    this.dataSource.paginator = this.paginator;

    this.displayedColumns = this.headerProcessed.map(
      (header, index) =>
        header.content?.nativeElement.innerHTML || 'col-' + index
    );
  }
}
