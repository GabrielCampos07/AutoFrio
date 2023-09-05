import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Observable, from } from 'rxjs';
import { CryptoStorage } from '@webcrypto/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  private publicKey: string = environment.publicKey;
  private cryptoStore = new CryptoStorage(this.publicKey);

  constructor() {}

  setItem(key: string, data: string): Observable<void> {
    return from(this.cryptoStore.set(key, data));
  }

  getItem(key: string): Observable<string | undefined> {
    return from(this.cryptoStore.get(key));
  }

  public removeItem(key: string): Promise<void> {
    return this.cryptoStore.delete(key);
  }

  public encryptAES(criptyValue: string): string {
    return CryptoJS.AES.encrypt(criptyValue, this.publicKey).toString();
  }

  public decryptAES(criptyValue: string): string {
    let bytes = CryptoJS.AES.decrypt(criptyValue, this.publicKey);
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return criptyValue;
  }
}
