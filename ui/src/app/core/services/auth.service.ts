import { Injectable } from '@angular/core';
import { Observable, concatMap, of, switchMap } from 'rxjs';
import { AuthenticateLogin } from 'src/app/shared/models/authenticate';
import { EncryptService } from 'src/app/shared/services/encrypt.service';
import { Http } from 'src/app/shared/services/http.service';
import { SecurityService } from 'src/app/shared/services/security.service';

@Injectable()
export class AuthService {
  private route: string = 'login';

  constructor(
    private http: Http,
    private securityService: SecurityService,
    private encryptService: EncryptService
  ) {}

  authenticate(auth: AuthenticateLogin): Observable<any> {
    // let _auth: AuthenticateLogin = {
    //   email: auth.email,
    //   password: this.securityService.encrypt(auth.password),
    // };

    return this.http.post(`${this.route}`, auth).pipe(
      switchMap((result: any) => {
        return [
          this.securityService.setToken(result.token),
          this.securityService.setLoggedUserId(result.user.id),
        ];
      })
    );
  }
}
