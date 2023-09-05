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
} from 'rxjs';
import { Cars } from './shared/cars';
import { CarsService } from './shared/cars.service';
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

  cars$!: Observable<Cars[]>;

  constructor(
    private matDialog: MatDialog,
    private carsService: CarsService,
    private alertService: AlertService,
    private dialogService: DialogService
  ) {}

  ngAfterViewInit() {
    const searchParts$: Observable<Cars[]> = fromEvent<any>(
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

  getCars(license_plate?: string): Observable<Cars[]> {
    return this.carsService.get(license_plate);
  }

  deleteCars(cars: Cars): void {
    this.dialogService
      .dialog(`Deseja mesmo excluir o item ${cars.model_id}?`, true)
      .afterClosed()
      .pipe(
        switchMap((result: Cars) => {
          if (result) {
            return this.carsService.delete(cars).pipe(
              tap(() =>
                this.alertService.success(
                  `${cars.model_id} excluido com sucesso!`
                )
              ),
              switchMap(() => this.refreshCarsList())
            );
          }
          return result;
        })
      )
      .subscribe();
  }

  refreshCarsList(): Observable<Cars[]> {
    return (this.cars$ = this.getCars());
  }

  async openCars(cars?: Cars) {
    const { FormsComponent } = await import('./forms/forms.component');
    this.matDialog
      .open(FormsComponent, {
        data: { cars: cars },
      })
      .afterClosed()
      .pipe(
        switchMap((result: Cars) => {
          if (result) {
            return (this.cars$ = this.getCars()).pipe(
              tap(() =>
                this.alertService.success(
                  `${cars?.model_id || 'item'} ${
                    cars?.id ? 'editado' : 'criado'
                  } com sucesso!`
                )
              )
            );
          }
          return result;
        })
      )
      .subscribe();
  }
}
