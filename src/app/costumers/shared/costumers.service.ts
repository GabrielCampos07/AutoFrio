import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '../../shared/services/http.service';
import { Costumers } from './costumers';

@Injectable({
  providedIn: 'root',
})
export class CostumersService {
  private route: string = 'costumers';

  constructor(private http: Http) {}

  getCostumers(): Observable<Costumers[]> {
    return this.http.get(`/${this.route}`);
  }

  getCostumer(costumers: Costumers): Observable<Costumers> {
    return this.http.get(`/${this.route}/${costumers.id}`);
  }

  getCostumersByName(name: string): Observable<Costumers[]> {
    return this.http.get(`/${this.route}?name_like=${name}`);
  }

  saveCostumer(costumer: Costumers) {
    return costumer.id
      ? this.http.put(`/${this.route}/${costumer.id}`, costumer)
      : this.http.post(`/${this.route}`, costumer);
  }
}
