import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get(url: string) {
    return fetch(this.apiUrl.concat(url), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
    })
      .then(res => res.json())
      .catch(err => Promise.reject(err.message));
  }
}
