import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { AuthenticateLogin } from '../shared/models/authenticate';
import { AuthService } from '../core/services/auth.service';
import { forkJoin, tap } from 'rxjs';
import { SecurityService } from '../shared/services/security.service';
import { EncryptService } from '../shared/services/encrypt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AlertService, AuthService],
})
export class LoginComponent {
  public hidePassword: boolean = true;
  public user: AuthenticateLogin = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  login(): void {
    this.authService
      .authenticate(this.user)
      .pipe(
        tap(() => {
          this.router.navigate(['dashboard']).then(() => {
            this.alertService.success('Login feito com sucesso');
          });
        })
      )
      .subscribe({
        error: (error) => {
          this.alertService.error(error.error.message);
        },
      });
  }
}
