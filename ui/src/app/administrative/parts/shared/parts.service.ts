import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from 'src/app/shared/services/http.service';
import { Parts } from './parts';

@Injectable({
  providedIn: 'root',
})
export class PartService {
  private route: string = 'parts';

  constructor(private http: Http) {}

  get(name?: string): Observable<Parts[]> {
    return name
      ? this.http.get(`${this.route}?name_like=${name}`)
      : this.http.get(`${this.route}`);
  }

  getById(part: Parts): Observable<Parts> {
    return this.http.get(`${this.route}/${part.id}`);
  }

  save(part: Parts) {
    return part.id
      ? this.http.put(`${this.route}/${part.id}`, part)
      : this.http.post(`${this.route}`, part);
  }

  delete(part: Parts) {
    return this.http.delete(`${this.route}/${part.id}`);
  }
}
