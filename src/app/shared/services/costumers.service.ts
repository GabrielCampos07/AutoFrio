import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CostumersService {
  private route: string = 'pecas';

  constructor(private http: Http) {}

  getCostumers(): Observable<any> {
    return this.http.get(`/${this.route}`);
  }
}
