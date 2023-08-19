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

  constructor(private costumersService: CostumersService) {}

  ngOnInit() {
    this.getCostumers();
  }

  getCostumers(): void {
    this.costumersService
      .getCostumers()
      .subscribe((costumers) => (this.costumers = costumers));
  }
}
