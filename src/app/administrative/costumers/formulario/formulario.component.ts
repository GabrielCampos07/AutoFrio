import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Costumers } from 'src/app/administrative/costumers/shared/costumers';
import { CostumersService } from 'src/app/administrative/costumers/shared/costumers.service';
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
    private costumersService: CostumersService
  ) {}

  ngOnInit() {
    if (this.data.costumer) {
      this.costumersService.getById(this.data.costumer).subscribe({
        next: (costumers) => {
          this.costumer = costumers;
        },
      });
      return;
    }
  }

  saveCostumer(form: FormComponent): void {
    if (form.valid()) {
      this.costumersService.save(this.costumer).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: () => {
          alert('error');
        },
      });
    }
  }
}
