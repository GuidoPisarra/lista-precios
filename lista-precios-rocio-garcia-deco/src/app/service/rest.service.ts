
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  private api = environment.baseUrl;


  constructor(
    public http: HttpClient
  ) { }

  getOneProduct(code: any): Observable<any> {

    const path = `${this.api}/products/precio_producto_sin_token/` + code + `/2`;
    const producto = this.http.get<any>(path);
    return producto;
  }


}
