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

  getPortfolioPercentages() {
    return this.http.get(`${environment.BaseApiUrl}/portfolio/percentages`)
  }

  getRanking() {
    return this.http.get(`${environment.BaseApiUrl}/portfolio/all-ranks`)
  }

  addPriceAlert(alert : any) {
    return this.http.post(`${environment.BaseApiUrl}/PriceAlert`, alert)
  }

  deletePriceAlert(id : string) {
    return this.http.delete(`${environment.BaseApiUrl}/PriceAlert/${id}`)
  }

  getAllPriceAlerts() {
    return this.http.get(`${environment.BaseApiUrl}/PriceAlert`)
  }

}
