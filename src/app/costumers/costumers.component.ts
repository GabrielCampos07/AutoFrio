import { Component } from '@angular/core';
import { CostumersService } from '../shared/services/costumers.service';
import { Costumers } from '../shared/models/costumers';

@Component({
  selector: 'app-costumers',
  templateUrl: './costumers.component.html',
  styleUrls: ['./costumers.component.scss'],
})
export class CostumersComponent {
  costumers!: Costumers[];
  costumerName: string = '';

  constructor(private costumersService: CostumersService) {}

  ngOnInit(): void {
    this.costumersService
      .getCostumers()
      .subscribe((costumers) => (this.costumers = costumers));
  }

  getCostumersByName(): void {
    this.costumersService
      .getCostumersByName(this.costumerName)
      .subscribe((costumers) => (this.costumers = costumers));
  }
}
