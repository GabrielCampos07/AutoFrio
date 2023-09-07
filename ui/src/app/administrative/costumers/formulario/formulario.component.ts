import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  KeyValueDiffer,
  KeyValueDiffers,
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
export class FormularioComponent {
  private objectDiffer!: KeyValueDiffer<any, any>;

  costumer: Costumer = {};
  costumerEdited: Costumer = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { costumer: Costumer },
    public dialogRef: MatDialogRef<FormularioComponent>,
    private CostumerService: CostumerService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    private differs: KeyValueDiffers
  ) {}

  ngOnInit() {
    this.objectDiffer = this.differs.find(this.costumer).create();

    if (this.data.costumer) {
      this.CostumerService.getById(this.data.costumer).subscribe(
        (costumers) => {
          this.costumer = costumers;
          this.cdr.detectChanges();
        }
      );
    }
  }

  ngDoCheck() {
    const changes = this.objectDiffer.diff(this.costumer);

    if (changes) {
      changes.forEachChangedItem((change) => {
        this.costumerEdited[change.key] = change.currentValue;
      });
    }
  }

  saveCostumer(form: FormComponent): void {
    if (this.costumer.id)
      this.costumer = { id: this.costumer.id, ...this.costumerEdited };

    this.cleanCostumerFields();

    if (form.valid()) {
      this.CostumerService.save(this.costumer)
        .pipe(
          tap((car) => {
            this.handleSuccess(car);
          })
        )
        .subscribe({
          error: (error) => {
            this.handleError(error);
          },
        });
    }
  }

  private cleanCostumerFields(): void {
    this.costumer = {
      ...this.costumer,
      cep: this.costumer.cep?.toString().replace(/\D/g, ''),
      document: this.costumer.document?.toString().replace(/\D/g, ''),
      phone: this.costumer.phone?.toString().replace(/\D/g, ''),
      phone_2: this.costumer.phone_2?.toString().replace(/\D/g, ''),
    };
  }

  private handleSuccess(costumer: any): void {
    this.alertService.success(
      `${costumer?.model} ${costumer?.id ? 'editado' : 'criado'} com sucesso!`
    );
    this.dialogRef.close('ok');
  }

  private handleError(error: any): void {
    this.alertService.error(error.message);
  }
}
