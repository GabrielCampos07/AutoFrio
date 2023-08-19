// serviço de http geral

import { environment } from './../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { retry } from 'rxjs/operators';
import { autoUnsubscribe } from 'src/app/core/pipes/autoUnsubscribe';

@Injectable({
  providedIn: 'root',
})
export class Http {
  private environment = environment.api;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  /**
   * Função de requisição HTTP Get
   *
   * @param {{}} url URL ser acessada
   * @param {{}} TypeGet Tipo do objeto a ser retornado Ex.: Usuário
   *
   *
   */

  public get<T>(url: string, options?: any): Observable<T> {
    const _url: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.environment + url
    );
    const _securityUrl: string = this.sanitizer.sanitize(5, _url) as string;
    return this.http
      .get<T>(_securityUrl, options)
      .pipe(retry(3), autoUnsubscribe()) as Observable<T>;
  }

  public getExternal<T>(url: string, options?: any): Observable<any> {
    const _safeResourceUrl: SafeResourceUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(url);
    const _safeUrl: string = this.sanitizer.sanitize(
      5,
      _safeResourceUrl
    ) as string;
    return this.http.get<T>(_safeUrl, options);
  }

  public getText<T>(url: string, options?: any): Observable<any> {
    const _safeResourceUrl: SafeResourceUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(this.environment + url);
    const _safeUrl: string = this.sanitizer.sanitize(
      5,
      _safeResourceUrl
    ) as string;
    let obj: any = {};
    if (options) {
      obj = options;
      obj.responseType = 'text' as 'json';
    } else obj = { responseType: 'text' as 'json' };

    return this.get<T>(_safeUrl, obj);
  }

  public getBlob<T>(url: string, options?: any): Observable<any> {
    const _safeResourceUrl: SafeResourceUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(this.environment + url);
    const _safeUrl: string = this.sanitizer.sanitize(
      5,
      _safeResourceUrl
    ) as string;

    let obj: any = {};
    if (options) {
      obj = options;
      obj.responseType = 'text' as 'blob';
    } else obj = { responseType: 'text' as 'blob' };

    return this.get<T>(_safeUrl, obj);
  }

  /**
   * Função de requisição HTTP post
   *
   * @param {{}} url URL ser acessada
   * @param {{}} data Objeto a ser enviado
   * @param {{}} SendType Tipo do objeto a ser enviado Ex.: AuthLogin
   * @param {{}} ReturnType Tipo do objeto a ser retornado Ex.: AuthReturn
   *
   */
  public post<SendType, ReturnType>(
    url: string,
    data: SendType,
    options?: any
  ): Observable<ReturnType> {
    // let _responseType = returnText ? ('text' as 'json') : 'json';

    const _safeResourceUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
      this.environment + url
    );
    const _safeUrl: string = this.sanitizer.sanitize(
      4,
      _safeResourceUrl
    ) as string;
    return (
      this.http.post<ReturnType>(
        _safeUrl,
        data,
        options
      ) as Observable<ReturnType>
    ).pipe(autoUnsubscribe());
  }

  /**
   * Função de requisição HTTP patch
   *
   * @param {{}} url URL ser acessada
   * @param {{}} data Objeto a ser enviado
   * @param {{}} SendType Tipo do objeto a ser enviado Ex.: AuthLogin
   * @param {{}} ReturnType Tipo do objeto a ser retornado Ex.: AuthReturn
   *
   */
  public patch<SendType, ReturnType>(
    url: string,
    data: SendType,
    returnText?: boolean
  ): Observable<ReturnType> {
    let _responseType = returnText ? ('text' as 'json') : 'json';

    const _safeResourceUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
      this.environment + url
    );
    const _safeUrl: string = this.sanitizer.sanitize(
      4,
      _safeResourceUrl
    ) as string;
    return this.http
      .patch<ReturnType>(_safeUrl, data, {
        responseType: _responseType,
      })
      .pipe(autoUnsubscribe());
  }
  /**
   * Função de requisição HTTP Put
   *
   * @param {{}} url URL ser acessada
   * @param {{}} SendType Tipo do objeto a ser enviado Ex.: Usuário
   *
   */
  public put<SendType, ReturnType>(
    url: string,
    data: SendType,
    options?: any
  ): Observable<any> {
    const _safeResourceUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
      this.environment + url
    );
    const _safeUrl: string = this.sanitizer.sanitize(
      4,
      _safeResourceUrl
    ) as string;
    return this.http
      .put<ReturnType>(_safeUrl, data, options)
      .pipe(autoUnsubscribe());
  }
  /**
   * Função de requisição HTTP Delete
   *
   * @param {{}} url URL ser acessada
   *
   */
  public delete(url: string): Observable<boolean> {
    const _safeResourceUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
      this.environment + url
    );
    const _safeUrl: string = this.sanitizer.sanitize(
      4,
      _safeResourceUrl
    ) as string;
    return this.http.delete<boolean>(_safeUrl).pipe(autoUnsubscribe());
  }
}
