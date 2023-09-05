import { Component, ElementRef, ViewChild } from '@angular/core';
import { CostumersService } from './shared/costumers.service';
import { Costumers } from './shared/costumers';
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

  costumers$!: Observable<Costumers[]>;

  constructor(
    private matDialog: MatDialog,
    private alertService: AlertService,
    private costumersService: CostumersService,
    private dialogService: DialogService
  ) {}

  ngAfterViewInit() {
    const searchParts$: Observable<Costumers[]> = fromEvent<any>(
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

  getCostumers(name?: string): Observable<Costumers[]> {
    return this.costumersService.get(name);
  }

  deleteCostumer(costumers: Costumers): void {
    this.dialogService
      .dialog(`Deseja mesmo excluir o item ${costumers.name}?`, true)
      .afterClosed()
      .pipe(
        switchMap((result: Costumers) => {
          if (result) {
            return this.costumersService.delete(costumers).pipe(
              tap(() =>
                this.alertService.success(
                  `${costumers.name} excluido com sucesso!`
                )
              ),
              switchMap(() => this.refreshCostumersList())
            );
          }
          return result;
        })
      )
      .subscribe();
  }

  refreshCostumersList(): Observable<Costumers[]> {
    return (this.costumers$ = this.getCostumers());
  }

  async openCostumer(costumer?: Costumers) {
    const { FormularioComponent } = await import(
      './formulario/formulario.component'
    );
    this.matDialog
      .open(FormularioComponent, {
        data: { costumer: costumer },
      })
      .afterClosed()
      .pipe(
        switchMap((result: Costumers) => {
          if (result) {
            return (this.costumers$ = this.getCostumers()).pipe(
              tap(() =>
                this.alertService.success(
                  `${costumer?.name || 'item'} ${
                    costumer?.id ? 'editado' : 'criado'
                  } com sucesso!`
                )
              )
            );
          }
          return result;
        })
      )
      .subscribe();
  }
}
