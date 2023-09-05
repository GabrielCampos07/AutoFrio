import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from 'src/app/shared/services/http.service';
import { Cars } from './cars';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private route: string = 'cars';

  constructor(private http: Http) {}

  get(license_plate?: string): Observable<Cars[]> {
    return license_plate
      ? this.http.get(`${this.route}?license_plate_like=${license_plate}`)
      : this.http.get(`${this.route}`);
  }

  getById(cars: Cars): Observable<Cars> {
    return this.http.get(`${this.route}/${cars.id}`);
  }

  save(cars: Cars) {
    return cars.id
      ? this.http.put(`${this.route}/${cars.id}`, cars)
      : this.http.post(`${this.route}`, cars);
  }

  delete(cars: Cars) {
    return this.http.delete(`${this.route}/${cars.id}`);
  }
}
