import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from 'src/app/shared/services/http.service';
import { Parts } from './parts';

@Injectable({
  providedIn: 'root',
})
export class PartsService {
  private route: string = 'parts';

  constructor(private http: Http) {}

  getParts(): Observable<Parts[]> {
    return this.http.get(`/${this.route}`);
  }

  getPart(parts: Parts): Observable<Parts> {
    return this.http.get(`/${this.route}/${parts.id}`);
  }

  getPartsByName(name: string): Observable<Parts[]> {
    return this.http.get(`/${this.route}?name_like=${name}`);
  }

  savePart(costumer: Parts) {
    return costumer.id
      ? this.http.put(`/${this.route}/${costumer.id}`, costumer)
      : this.http.post(`/${this.route}`, costumer);
  }

  deletePart(part: Parts) {
    return this.http.delete(`/${this.route}/${part.id}`);
  }
}
