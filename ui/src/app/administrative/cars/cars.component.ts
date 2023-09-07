import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  Observable,
  concat,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
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
  @ViewChild('input') input!: ElementRef;

  cars$!: Observable<Car[]>;

  constructor(
    private matDialog: MatDialog,
    private carService: CarService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {}

  ngAfterViewInit() {
    const searchParts$: Observable<Car[]> = fromEvent<any>(
      this.input.nativeElement,
      'keyup'
    ).pipe(
      map((event) => event.target.value),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search) => this.getCars(search))
    );

    const initialParts$ = this.getCars();

    this.cars$ = concat(initialParts$, searchParts$);
  }

  getCars(license_plate?: string): Observable<Car[]> {
    return this.carService.get(license_plate);
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

  refreshCarsList(): Observable<Car[]> {
    return (this.cars$ = this.getCars());
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
