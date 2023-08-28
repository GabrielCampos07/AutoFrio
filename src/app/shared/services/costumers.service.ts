import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from './http.service';
import { Costumers } from '../models/costumers';

@Injectable({
  providedIn: 'root',
})
export class CostumersService {
  private route: string = 'costumers';

  constructor(private http: Http) {}

  getCostumers(): Observable<Costumers[]> {
    return this.http.get(`/${this.route}`);
  }

  getCostumersByName(name: string): Observable<Costumers[]> {
    return this.http.get(`/${this.route}?name_like=${name}`);
  }
}
