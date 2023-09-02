import { Component, ElementRef, ViewChild } from '@angular/core';
import { CostumersService } from './shared/costumers.service';
import { Costumers } from './shared/costumers';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import {
  Observable,
  concat,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-costumers',
  templateUrl: './costumers.component.html',
  styleUrls: ['./costumers.component.scss'],
})
export class CostumersComponent {
  costumers$!: Observable<Costumers[]>;

  constructor(
    private matDialog: MatDialog,
    private costumersService: CostumersService,
    private _snackBar: MatSnackBar
  ) {}

  @ViewChild('input') input!: ElementRef;

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
    this.matDialog
      .open(ModalComponent, {
        data: {
          message: `Deseja mesmo excluir o item ${costumers.name}?`,
          buttons: true,
        },
      })
      .afterClosed()
      .pipe(
        switchMap((result) =>
          result ? this.costumersService.delete(costumers) : result
        ),
        switchMap(() => (this.costumers$ = this.getCostumers()))
      )
      .subscribe(() => {
        this._snackBar.open(`${costumers.name} excluido com sucesso!`, 'OK');
        setTimeout(() => {
          this._snackBar.dismiss();
        }, 3000);
      });
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
        switchMap((result) =>
          result ? (this.costumers$ = this.getCostumers()) : result
        )
      )
      .subscribe(() => {
        this._snackBar.open(
          `${costumer?.name || 'item'}
            ${costumer?.id ? 'editado' : 'criado'} com sucesso!`,
          'OK'
        );
        setTimeout(() => {
          this._snackBar.dismiss();
        }, 3000);
      });
  }
}
