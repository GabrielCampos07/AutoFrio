import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Costumers } from 'src/app/administrative/costumers/shared/costumers';
import { CostumerService } from 'src/app/administrative/costumers/shared/costumer.service';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class FormularioComponent implements OnInit {
  costumer: Costumers = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { costumer: Costumers },
    public dialogRef: MatDialogRef<FormularioComponent>,
    private CostumerService: CostumerService
  ) {}

  ngOnInit() {
    if (this.data.costumer) {
      this.CostumerService.getById(this.data.costumer).subscribe(
        (costumers) => (this.costumer = costumers)
      );
    }
  }

  saveCostumer(form: FormComponent): void {
    if (form.valid()) {
      this.CostumerService.save(this.costumer).subscribe();
    }
  }
}
