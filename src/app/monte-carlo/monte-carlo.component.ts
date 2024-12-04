// monte-carlo.component.ts
import { Component, OnInit } from '@angular/core';
import { MonteCarloService } from '../services/monte-carlo.service';
import {
  Chart,
  ChartConfiguration,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

@Component({
  selector: 'app-monte-carlo',
  templateUrl: './monte-carlo.component.html',
  styleUrls: ['./monte-carlo.component.css']
})
export class MonteCarloComponent implements OnInit {
  avgExpectedReturn: number = 0;
  valueAtRisk95: number = 0;

  constructor(private monteCarloService: MonteCarloService) {}

  ngOnInit(): void {
    // Register necessary components
    Chart.register(
      CategoryScale,
      LinearScale,
      LineController,
      LineElement,
      PointElement,
      Title,
      Tooltip,
      Legend
    );

    this.fetchMonteCarloData();
  }

  fetchMonteCarloData(): void {
    const userId = 1; // Example user ID
    this.monteCarloService.getMonteCarloSimulations(userId, 1000, 252).subscribe(
      (data) => {
        this.avgExpectedReturn = data.avg_expected_return;
        this.valueAtRisk95 = data.value_at_risk_95;
        this.plotSimulations(data.simulations);
      },
      (error) => console.error('Error fetching Monte Carlo data:', error)
    );
  }

  plotSimulations(simulations: { [key: string]: number[] }): void {
    const labels = Array.from({ length: simulations['0'].length }, (_, i) => i); // Create labels for time steps

    const datasets = Object.values(simulations).map((simulation) => ({
      label: 'Simulated Path',
      data: simulation,
      borderColor: 'rgba(75,192,192,0.4)',
      fill: false,
      pointRadius: 0 // No points to make lines smoother
    }));

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels,
        datasets
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Monte Carlo Simulated Portfolio Outcomes'
          },
          legend: {
            display: false
          }
        },
        scales: {
          x: { title: { display: true, text: 'Time Horizon (Days)' } },
          y: { title: { display: true, text: 'Portfolio Value ($)' } }
        }
      }
    };

    const chart = new Chart('monteCarloChart', config); // 'monteCarloChart' is the canvas element ID
  }
}
