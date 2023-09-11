import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarService } from '../shared/car.service';
import { Brand, Car, Model } from '../shared/car';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { CommonModule } from '@angular/common';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  standalone: true,
  imports: [SharedModule, CommonModule],
  providers: [AlertService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsComponent implements OnInit {
  car: Car = {};

  brands$: Observable<string[]> = new Observable<string[]>();
  models$: Observable<string[]> = new Observable<string[]>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { car: Car },
    public dialogRef: MatDialogRef<FormsComponent>,
    private carService: CarService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.data.car) this.getCar();

    this.brands$ = this.getBrand();
    this.models$ = this.getModel();
  }

  saveCar(form: FormComponent): void {
    if (form.valid()) {
      this.carService
        .save(this.car)
        .pipe(
          tap(() => this.handleSuccess()),
          catchError((err) => {
            this.handleError(err);
            return throwError(err);
          })
        )
        .subscribe();
    }
  }

  refreshBrandID(): void {
    let _brandName = this.car.brand!.toString();

    this.getBrandByName(_brandName).subscribe(
      (result: Brand[]) => (this.car.brand_id = result[0].id)
    );
  }

  refreshModelID(): void {
    let modelName = this.car.model!.toString();

    this.getModelByName(modelName).subscribe(
      (result: Model[]) => (this.car.model_id = result[0].id)
    );
  }

  getCar(): void {
    this.carService.getById(this.data.car).subscribe((car) => {
      this.car = car;
      this.cdr.detectChanges();
    });
  }

  getBrand(): Observable<string[]> {
    return this.carService
      .getBrand()
      .pipe(map((brands) => brands.map((brand) => brand.name!)));
  }

  getModel(): Observable<string[]> {
    return this.carService
      .getModel()
      .pipe(map((models) => models.map((model) => model.name!)));
  }

  getBrandByName(name: string): Observable<Brand[]> {
    return this.carService.getBrand(name);
  }

  getModelByName(name: string): Observable<Model[]> {
    return this.carService.getModel(name);
  }

  private handleSuccess(): void {
    this.alertService.success(
      `item ${this.car.id ? 'editado' : 'criado'} com sucesso!`
    );

    this.dialogRef.close('ok');
  }

  private handleError(error: Error): void {
    this.alertService.error(error.message);
  }
}
