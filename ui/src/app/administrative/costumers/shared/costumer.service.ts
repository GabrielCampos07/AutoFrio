import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '../../../shared/services/http.service';
import { Costumers } from './costumers';

@Injectable({
  providedIn: 'root',
})
export class CostumerService {
  private route: string = 'costumers';

  constructor(private http: Http) {}

  get(name?: string): Observable<Costumers[]> {
    return name
      ? this.http.get(`${this.route}?name_like=${name}`)
      : this.http.get(`${this.route}`);
  }

  getById(costumer: Costumers): Observable<Costumers> {
    return this.http.get(`${this.route}/${costumer.id}`);
  }

  save(costumer: Costumers) {
    return costumer.id
      ? this.http.put(`${this.route}/${costumer.id}`, costumer)
      : this.http.post(`${this.route}`, costumer);
  }

  delete(costumer: Costumers) {
    return this.http.delete(`${this.route}/${costumer.id}`);
  }
}
