import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '../../../shared/services/http.service';
import { Costumer } from './costumers';

@Injectable({
  providedIn: 'root',
})
export class CostumerService {
  private route: string = 'customer';

  constructor(private http: Http) {}

  get(search?: string): Observable<Costumer[]> {
    return search
      ? this.http.get(`${this.route}`, search)
      : this.http.get(`${this.route}`);
  }

  getById(costumer: Costumer): Observable<Costumer> {
    return this.http.get(`${this.route}/${costumer.id}`);
  }

  save(costumer: Costumer) {
    return costumer.id
      ? this.http.put(`${this.route}/${costumer.id}`, costumer)
      : this.http.post(`${this.route}`, costumer);
  }

  delete(costumer: Costumer) {
    return this.http.delete(`${this.route}/${costumer.id}`);
  }
}
