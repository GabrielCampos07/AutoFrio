import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from 'src/app/shared/services/http.service';
import { Brand, Car, Model } from './car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private route: string = 'car';

  constructor(private http: Http) {}

  get(searchTerm?: Car): Observable<Car[]> {
    return this.http.get(`${this.route}`, { params: searchTerm });
  }

  getById(car: Car): Observable<Car> {
    return this.http.get(`${this.route}/${car.id}`);
  }

  save(car: Car): Observable<Car> {
    return car.id
      ? this.http.put(`${this.route}/${car.id}`, car)
      : this.http.post(`${this.route}`, car);
  }

  delete(car: Car): Observable<boolean> {
    return this.http.delete(`${this.route}/${car.id}`);
  }

  getBrand(name?: string): Observable<Brand[]> {
    return name
      ? this.http.get(`${this.route}/brand?name=${name}`)
      : this.http.get(`${this.route}/brand`);
  }

  getModel(name?: string): Observable<Model[]> {
    return name
      ? this.http.get(`${this.route}/model?name=${name}`)
      : this.http.get(`${this.route}/model`);
  }
}
