import { Component, ElementRef, ViewChild } from '@angular/core';
import { CostumerService } from './shared/costumer.service';
import { Costumer } from './shared/costumers';
import { MatDialog } from '@angular/material/dialog';
import {
  Observable,
  concat,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-costumers',
  templateUrl: './costumers.component.html',
  styleUrls: ['./costumers.component.scss'],
  providers: [AlertService, DialogService],
})
export class CostumersComponent {
  @ViewChild('input') input!: ElementRef;

  costumers$: Observable<Costumer[]> = new Observable<Costumer[]>();

  constructor(
    private matDialog: MatDialog,
    private alertService: AlertService,
    private CostumerService: CostumerService,
    private dialogService: DialogService
  ) {}

  ngAfterViewInit() {
    const searchParts$: Observable<Costumer[]> = fromEvent<any>(
      this.input.nativeElement,
      'keyup'
    ).pipe(
      map((event) => event.target.value),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search) => this.getCostumers(search))
    );

    const initialParts$ = this.getCostumers();

    this.costumers$ = concat(initialParts$, searchParts$);
  }

  getCostumers(name?: string): Observable<Costumer[]> {
    return this.CostumerService.get(name);
  }

  deleteCostumer(costumer: Costumer): void {
    this.dialogService
      .dialog(`Deseja mesmo excluir o item ${costumer.name}?`, true)
      .afterClosed()
      .subscribe((result) => {
        if (result) this.deleteCostumerAndRefreshList(costumer);
      });
  }

  private deleteCostumerAndRefreshList(costumer: Costumer): void {
    this.CostumerService.delete(costumer).pipe(
      tap(() =>
        this.alertService.success(`${costumer.name} excluido com sucesso!`)
      ),
      switchMap(() => this.refreshCostumersList())
    );
  }

  refreshCostumersList(): Observable<Costumer[]> {
    return (this.costumers$ = this.getCostumers());
  }

  async openCostumer(costumer?: Costumer) {
    const { FormularioComponent } = await import(
      './formulario/formulario.component'
    );
    this.matDialog
      .open(FormularioComponent, {
        data: { costumer: costumer },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) return (this.costumers$ = this.getCostumers());
        return;
      });
  }
}
