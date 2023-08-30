import { Component } from '@angular/core';
import { CostumersService } from './shared/costumers.service';
import { Costumers } from './shared/costumers';
import { MatDialog } from '@angular/material/dialog';

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
    private costumersService: CostumersService
  ) {}

  ngOnInit(): void {
    this.getCostumer();
  }

  getCostumer(): void {
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

  deleteCostumer(costumer: Costumers) {
    this.costumersService
      .deleteCostumer(costumer)
      .subscribe((costumer) => console.log(costumer));
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
      .subscribe(() => this.getCostumer());
  }
}
