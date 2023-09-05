import { Injectable } from '@angular/core';
import { EncryptService } from './encrypt.service';
import { Observable } from 'rxjs';
import { Logged_user_id, TokenName } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  constructor(private router: Router, private encryptService: EncryptService) {}

  public encrypt(password: string): string {
    return this.encryptService.encryptAES(password);
  }

  public setToken(token: string): Observable<void> {
    return this.encryptService.setItem(TokenName, token);
  }

  public getToken(): Observable<string | undefined> {
    return this.encryptService.getItem(TokenName);
  }

  public logout(): void {
    this.encryptService.removeItem(TokenName);
    this.router.navigate(['/login']);
  }

  public setLoggedUserId(userId: string): Observable<void> {
    return this.encryptService.setItem(Logged_user_id, userId);
  }

  public getLoggedUserId(): Observable<string | undefined> {
    return this.encryptService.getItem(Logged_user_id);
  }
}
