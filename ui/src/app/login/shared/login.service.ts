import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private route: string = 'login';

  constructor(private http: Http) {}

  login(user: any): Observable<any> {
    return this.http.post(`${this.route}`, user);
  }
}
