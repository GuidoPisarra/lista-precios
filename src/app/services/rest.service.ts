import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  private api = environment.baseUrl;


  constructor(
    public http: HttpClient
  ) { }

  getOneProduct(code: any): Observable<any> {
    let product: any;
    const path = `${this.api}/products_one/` + code + '/2';
    const data = this.http.get<any>(path);
    return data;
  }
}