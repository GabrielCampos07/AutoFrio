import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Costumer } from 'src/app/administrative/costumers/shared/costumers';
import { CostumerService } from 'src/app/administrative/costumers/shared/costumer.service';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { tap } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  standalone: true,
  imports: [SharedModule],
  providers: [AlertService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioComponent implements OnInit {
  costumer: Costumer = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { costumer: Costumer },
    public dialogRef: MatDialogRef<FormularioComponent>,
    private CostumerService: CostumerService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.data.costumer) {
      this.CostumerService.getById(this.data.costumer).subscribe(
        (costumers) => {
          this.costumer = costumers;
          this.cdr.detectChanges();
        }
      );
    }
  }

  saveCostumer(form: FormComponent): void {
    form.inputs.map((input) => console.log(input));
    if (form.valid()) {
      this.CostumerService.save(this.costumer)
        .pipe(
          tap((car) => {
            this.alertService.success(
              `${car?.model || 'item'} ${
                car?.id ? 'editado' : 'criado'
              } com sucesso!`
            );
            this.dialogRef.close('ok');
          })
        )
        .subscribe({
          error: (error) => {
            this.alertService.error(error.message);
          },
        });
    }
  }
}
