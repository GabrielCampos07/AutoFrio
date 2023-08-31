import { Component } from '@angular/core';
import { CostumersService } from './shared/costumers.service';
import { Costumers } from './shared/costumers';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Observable, concatMap } from 'rxjs';

@Component({
  selector: 'app-costumers',
  templateUrl: './costumers.component.html',
  styleUrls: ['./costumers.component.scss'],
})
export class CostumersComponent {
  costumers!: Costumers[];
  costumerName: string = '';

  constructor(
    private matDialog: MatDialog,
    private costumersService: CostumersService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCostumers();
  }

  getCostumers(): void {
    this.costumersService.getCostumers().subscribe({
      next: (costumers) => {
        this.costumers = costumers;
      },
    });
  }

  getCostumersByName(): void {
    this.costumersService.getCostumersByName(this.costumerName).subscribe({
      next: (costumers) => {
        this.costumers = costumers;
      },
    });
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
        concatMap((result) => {
          if (result) return this.costumersService.deleteCostumer(costumers);
          return result;
        })
      )
      .subscribe(() => {
        this.getCostumers();
        this._snackBar.open(`${costumers.name} excluido com sucesso!`, 'OK');
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
      .subscribe(() => {
        this.getCostumers();
        this._snackBar.open(
          `${costumer?.name || 'item'}
          ${costumer?.id ? 'editado' : 'criado'} com sucesso!`,
          'OK'
        );
      });
  }
}
