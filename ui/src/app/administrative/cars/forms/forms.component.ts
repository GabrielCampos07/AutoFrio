import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarsService } from '../shared/cars.service';
import { Cars } from '../shared/cars';
import { FormComponent } from 'src/app/shared/components/form/form.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class FormsComponent implements OnInit {
  cars: Cars = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { cars: Cars },
    public dialogRef: MatDialogRef<FormsComponent>,
    private carsService: CarsService
  ) {}

  ngOnInit() {
    if (this.data.cars) {
      this.carsService
        .getById(this.data.cars)
        .subscribe((cars) => (this.cars = cars));
    }
  }

  saveCar(form: FormComponent): void {
    if (form.valid()) {
      this.carsService.save(this.cars).subscribe();
    }
  }
}
