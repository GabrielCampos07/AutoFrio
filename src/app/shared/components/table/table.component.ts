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
  @Input() public get data(): unknown[] {
    return this._data;
  }

  public set data(v: unknown[] | undefined) {
    this._data = v || [];
    this.dataSource = new MatTableDataSource(this.data);
  }

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

  private _data: unknown[] = [];

  @ViewChild(MatPaginator) private paginator!: MatTableDataSourcePaginator;

  constructor(private cd: ChangeDetectorRef) {}

  protected ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  protected ngAfterViewInit() {
    this.headerProcessed = this.headers!.map((header) => header);
    this.bodysProcessed = this.bodys.map((body) => body);

    this.dataSource.paginator = this.paginator;

    this.displayedColumns = this.headerProcessed.map(
      (header, index) =>
        header.content?.nativeElement.innerHTML || 'col-' + index
    );
    this.cd.detectChanges();
  }
}
