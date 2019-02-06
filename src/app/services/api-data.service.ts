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

  post(url: string, body: any = {}) {
    return fetch(this.apiUrl.concat(url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .catch(err => Promise.reject(err.message));
  }

  put(url: string, body: any = {}) {
    return fetch(this.apiUrl.concat(url), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .catch(err => Promise.reject(err.message));
  }

  delete(url: string) {
    return fetch(this.apiUrl.concat(url), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
    })
      .then(res => res.json())
      .catch(err => Promise.reject(err.message));
  }
}
