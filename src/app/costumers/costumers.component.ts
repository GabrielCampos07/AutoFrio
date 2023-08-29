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
    this.costumersService
      .getCostumers()
      .subscribe((costumers) => (this.costumers = costumers));
  }

  getCostumersByName(): void {
    this.costumersService
      .getCostumersByName(this.costumerName)
      .subscribe((costumers) => (this.costumers = costumers));
  }

  async openCostumer(Costumer?: Costumers) {
    console.log(Costumer);
    const { FormularioComponent } = await import(
      './formulario/formulario.component'
    );
    this.matDialog.open(FormularioComponent, {
      data: { costumer: Costumer },
    });
  }
}
