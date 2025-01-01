import { Component, Input, OnChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-performance-dashboard-component',
  templateUrl: './performance-dashboard-component.component.html',
  styleUrls: ['./performance-dashboard-component.component.css']
})
export class PerformanceDashboardComponentComponent implements OnChanges {
  @Input() metrics: any = {};
  @Input() userTrades: any[] = [];
  @Input() expertTrades: any[] = [];

  profitChartData: any;
  winRatioChartData: any;
  recommendationMatchData: any;

  ngOnChanges(): void {
    this.generateCharts();
  }

  generateCharts(): void {
    this.profitChartData = {
      labels: ['Profit', 'Loss'],
      datasets: [
        {
          label: 'Profit/Loss Distribution',
          data: [
            this.metrics.total_profit_loss > 0 ? this.metrics.total_profit_loss : 0,
            this.metrics.total_profit_loss < 0 ? Math.abs(this.metrics.total_profit_loss) : 0
          ],
          backgroundColor: ['#4CAF50', '#FF5252'],
        }
      ]
    };

    this.winRatioChartData = {
      labels: ['Winning Trades', 'Losing Trades'],
      datasets: [
        {
          label: 'Win/Loss Ratio',
          data: [
            this.metrics.winning_trades,
            this.metrics.total_trades - this.metrics.winning_trades
          ],
          backgroundColor: ['#42A5F5', '#FFCDD2'],
        }
      ]
    };

    this.recommendationMatchData = {
      labels: ['Matched Recommendations', 'Unmatched Recommendations'],
      datasets: [
        {
          label: 'Recommendation Match Ratio',
          data: [
            Math.round((this.metrics.recommendation_match_ratio / 100) * this.metrics.total_trades),
            this.metrics.total_trades -
              Math.round((this.metrics.recommendation_match_ratio / 100) * this.metrics.total_trades)
          ],
          backgroundColor: ['#FFA726', '#BDBDBD'],
        }
      ]
    };
  }
}
