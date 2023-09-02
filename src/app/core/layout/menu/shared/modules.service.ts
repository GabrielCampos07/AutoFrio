import { Injectable } from '@angular/core';
import { Http } from '../../../../shared/services/http.service';
import { Observable } from 'rxjs';
import { Module } from './module';

@Injectable({
  providedIn: 'root',
})
export class ModulesService {
  private route: string = 'modules';

  constructor(private http: Http) {}

  public getModules(): Observable<Module[]> {
    return this.http.get(`/${this.route}`);
  }
}
