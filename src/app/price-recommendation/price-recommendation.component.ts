import { Component, OnInit } from '@angular/core';
import { PriceRecommenderService } from '../services/price-recommender.service';


@Component({
  selector: 'app-price-recommendation',
  templateUrl: './price-recommendation.component.html',
  styleUrls: ['./price-recommendation.component.css']
})
export class PriceRecommendationComponent implements OnInit {
  symbol: string = '';
  recommendation: any;
  error: string | null = null;

  constructor(private recommenderService: PriceRecommenderService) {}

  ngOnInit(): void {}

  getRecommendation(): void {
    if (this.symbol) {
      this.recommenderService.getRecommendation(this.symbol)
        .subscribe({
          next: (data) => {
            this.recommendation = data;
            this.error = null;
          },
          error: (err) => {
            this.error = err;
          }
        });
    } else {
      this.error = "Please enter a valid symbol";
    }
  }
}
