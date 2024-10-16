import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  getBalance() {
     return this.http.get(`${environment.BaseApiUrl}/portfolio/balance`)
  }

}
