import { Component } from '@angular/core';
import { PortfolioService } from '../services/portfolio.service';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css']
})
export class TradingComponent {
  
  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
      this.portfolioService.getBalance().subscribe((data) => {
        console.log(data);
      },
    error => console.log(error))
  }
}
