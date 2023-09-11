import { Component } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Car } from './shared/car';
import { CarService } from './shared/car.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  providers: [AlertService, DialogService],
})
export class CarsComponent {
  cars$: Observable<Car[]> = new Observable<Car[]>();
  searchCar: Car = {
    license_plate: '',
    year: 0,
    mileage: 0,
    color: '',
    model: { name: '' },
    brand: { name: '' },
  };

  constructor(
    private matDialog: MatDialog,
    private carService: CarService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {}

  ngAfterViewInit() {
    this.refreshCarsList();
  }

  getCars(searchCar?: Car): Observable<Car[]> {
    return this.carService.get(searchCar);
  }

  deleteCar(car: Car): void {
    this.dialogService
      .dialog(`Deseja mesmo excluir o item ${car.model}?`, true)
      .afterClosed()
      .subscribe((result) => {
        if (result) this.deleteCostumerAndRefreshList(car);
      });
  }

  private deleteCostumerAndRefreshList(car: Car): void {
    this.carService.delete(car).pipe(
      tap(() =>
        this.alertService.success(`${car.model} excluido com sucesso!`)
      ),
      switchMap(() => this.refreshCarsList())
    );
  }

  refreshCarsList(searchCar?: Car): Observable<Car[]> {
    return (this.cars$ = this.getCars(searchCar));
  }

  async openCar(car?: Car) {
    const { FormsComponent } = await import('./forms/forms.component');
    this.matDialog
      .open(FormsComponent, {
        data: { car: car },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) return (this.cars$ = this.getCars());
        return;
      });
  }
}
