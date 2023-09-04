import { Component } from '@angular/core';
import { LoginService } from './shared/login.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/services/alert.service';
import { AuthLogin } from './shared/authLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AlertService],
})
export class LoginComponent {
  public hidePassword: boolean = true;
  public user: AuthLogin = {
    email: '',
    password: '',
  };

  constructor(
    private loginService: LoginService,
    private router: Router,
    private alertService: AlertService
  ) {}

  login(): void {
    this.loginService.login(this.user).subscribe({
      next: (result) => {
        localStorage.setItem('token', result.token);
        this.router.navigate(['dashboard']).then(() => {
          this.alertService.success('Login feito com sucesso');
        });
      },
      error: (error) => {
        this.alertService.error(error.error.message);
      },
    });
  }
}
