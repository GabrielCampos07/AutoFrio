import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from 'src/app/shared/services/http.service';
import { Car } from './car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private route: string = 'car';

  constructor(private http: Http) {}

  get(license_plate?: string): Observable<Car[]> {
    return license_plate
      ? this.http.get(`${this.route}?license_plate_like=${license_plate}`)
      : this.http.get(`${this.route}`);
  }

  getById(car: Car): Observable<Car> {
    return this.http.get(`${this.route}/${car.id}`);
  }

  save(car: Car) {
    return car.id
      ? this.http.put(`${this.route}/${car.id}`, car)
      : this.http.post(`${this.route}`, car);
  }

  delete(car: Car) {
    return this.http.delete(`${this.route}/${car.id}`);
  }
}
