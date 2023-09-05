import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarService } from '../shared/car.service';
import { Car } from '../shared/car';
import { FormComponent } from 'src/app/shared/components/form/form.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class FormsComponent implements OnInit {
  car: Car = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { car: Car },
    public dialogRef: MatDialogRef<FormsComponent>,
    private carService: CarService
  ) {}

  ngOnInit() {
    if (this.data.car) {
      this.carService
        .getById(this.data.car)
        .subscribe((car) => (this.car = car));
    }
  }

  saveCar(form: FormComponent): void {
    if (form.valid()) {
      this.carService.save(this.car).subscribe();
    }
  }
}
