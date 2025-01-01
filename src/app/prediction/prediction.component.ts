import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { PredictionService } from '../services/prediction.service';
import Chart from 'chart.js/auto';



@Component({
  selector: 'nb-card-showcase',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PredictionComponent {
  ticker: string = ''; // Pour stocker la saisie de l'utilisateur
  pricePrediction: string = 'Découvrez où votre investissement pourrait vous mener grâce à nos prévisions de prix ! Anticipez les tendances du marché pour identifier les meilleures opportunités dinvestissement.';
  recommendation: string = 'Êtes-vous conscient des risques de votre portefeuille ? Protégez votre capital avec notre évaluation des risques personnalisée et prenez des décisions plus intelligentes.';
  riskAssessment1: string = 'Optimisez votre portefeuille avec nos recommandations basées sur des metrics et des analyses dexperts ! Ne laissez pas les choix difficiles vous freiner, laissez-nous vous guider.';

  peer: string = '';
  comp: string = '';
  i: string = '';
  int: string = '';
  movingAverageStrategy: string = '';
  rsiStrategy: string = '';
  bollingerBandsStrategy: string = '';
  overallRecommendation: string = '';
  volatility: string = '';
  beta: string = '';
  sharpe_ratio: string = '';
  rec: string = '';

  ticker1!: string;
  ticker2!: string;

  tickerp!: string;

  errorMessage: string = '';

  recommendationTrends: any[] = [];

  private chart!: Chart;


  constructor(
    private Service: PredictionService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
   // this.initChart(); // Initialize the chart after view initialization
  }

  initChart(): void {
    const ctx = document.getElementById('recommendationChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Moving Average', 'RSI', 'Bollinger Bands'], // Labels des axes X
        datasets: [{
          label: 'Recommendation Metrics', // L'étiquette du dataset
          data: [1, 1, 1], // Données par défaut qui seront mises à jour
          backgroundColor: [
            '#3e95cd', // Couleur pour Buy
            '#8e5ea2', // Couleur pour Sell
            '#3cba9f'  // Couleur pour Hold
          ],
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true, // Commence à zéro sur l'axe Y
            ticks: {
              display: false // Cacher les numéros sur l'axe Y
            }
          }
        },
        plugins: {
          legend: {
            position: 'top', // Position de la légende (en haut)
            labels: {
              generateLabels: function(chart) {
                // Personnalisation des étiquettes de la légende
                return [
                  {
                    text: 'Buy', 
                    fillStyle: '#3e95cd', // Couleur pour Buy
                    strokeStyle: '#3e95cd',
                    lineWidth: 1
                  },
                  {
                    text: 'Sell', 
                    fillStyle: '#8e5ea2', // Couleur pour Sell
                    strokeStyle: '#8e5ea2',
                    lineWidth: 1
                  },
                  {
                    text: 'Hold', 
                    fillStyle: '#3cba9f', // Couleur pour Hold
                    strokeStyle: '#3cba9f',
                    lineWidth: 1
                  }
                ];
              }
            }
          }
        }
      }
    });
}



  // Méthode pour mettre à jour le contenu des cartes
  update() {
    this.riskAssessment1 = `Risk assessment for ${this.ticker}: `;

    this.Service.risk(this.ticker).subscribe(
      (data2) => {
        console.log('API response:', data2);
        if (data2 && data2.interpretations) {
          this.volatility = `Volatility: ${data2.interpretations.volatility}`;
          this.beta = `Beta: ${data2.interpretations.beta}`;
          this.sharpe_ratio = `Sharpe Ratio: ${data2.interpretations.sharpe_ratio}`;
          this.rec = `Recommendation: ${data2.recommendations}`;
        } else {
          this.volatility = 'No strategy data available.';
          this.beta = 'No strategy data available.';
          this.sharpe_ratio = 'No strategy data available.';
          this.rec = 'No recommendation data available.';
        }
        this.cdr.markForCheck(); // Trigger change detection
      },
      (error) => {
        console.error('Error fetching risk assessment:', error);
      }
    );

    this.initChart()
    this.Service.rec(this.ticker).subscribe(
      (datar) => {
        console.log('API response for recommendations:', datar);
        if (datar) {
          this.movingAverageStrategy = `Moving Average Signal: ${datar.moving_average_strategy}`;
          this.rsiStrategy = `RSI Signal: ${datar.rsi_strategy}`;
          this.bollingerBandsStrategy = `Bollinger Bands Signal: ${datar.bollinger_bands_strategy}`;
          this.overallRecommendation = `Overall Recommendation: ${datar.overall_recommendation}`;
        } else {
          this.movingAverageStrategy = 'No strategy data available.';
          this.rsiStrategy = 'No strategy data available.';
          this.bollingerBandsStrategy = 'No strategy data available.';
          this.overallRecommendation = 'No recommendation data available.';
        }
        this.recommendation = `Recommendation for ${this.ticker}:`;
        this.updateRecommendationChart(); // Update the recommendation chart
        this.cdr.markForCheck();
      },
      (error) => {
        console.error('Error fetching strategy:', error);
        this.cdr.markForCheck();
      }
    );

    this.Service.prediction(this.ticker).subscribe((data) => {
      console.log('API response:', data); // Log the response
      this.pricePrediction = `Predicted price for ${this.ticker} is ${data.next_day_prediction}`;
      this.cdr.markForCheck(); // Trigger change detection
    });
  }

  updateC(): void {
    this.Service.compare(this.ticker1, this.ticker2).subscribe((data) => {
      this.comp = `Better Ticker: ${data.better_ticker}`;
      this.i = `Interpretation: ${data.interpretation}`;
      this.cdr.markForCheck(); // Trigger change detection
    });
  }

  updateP(): void {
    this.Service.peer(this.tickerp).subscribe((data) => {
      this.peer = `Best peer: ${data.best_peer}`;
      this.int = `Interpretation: ${data.interpretation}`;
      this.cdr.markForCheck(); // Trigger change detection
    });
  }

  fetchRecommendation() {
    this.recommendationTrends = []; // Reset data
    this.errorMessage = ''; // Reset error message

    if (!this.ticker) {
      this.errorMessage = 'Please enter a ticker symbol.';
      return;
    }

    this.Service.exp(this.ticker).subscribe(
      (data2) => {
        console.log('API response:', data2); // Log the response
        this.recommendationTrends = data2 || [];
        this.cdr.markForCheck(); // Trigger change detection
      },
      (error) => {
        this.errorMessage = error;
        this.cdr.markForCheck(); // Trigger change detection
      }
    );
  }

  renderChart(counts: { [key: string]: number }): void {
    console.log('Rendering chart with counts:', counts);
    // Define your chart options here...
  }

  updateRecommendationChart(): void {
    // Define the signals based on the recommendation strategy
    const movingAvgSignal = this.movingAverageStrategy.includes('Buy') ? 1 : (this.movingAverageStrategy.includes('Sell') ? 1 : 1);
    const rsiSignal = this.rsiStrategy.includes('Buy') ? 1 : (this.rsiStrategy.includes('Sell') ? 1 : 1);
    const bollingerSignal = this.bollingerBandsStrategy.includes('Buy') ? 1 : (this.bollingerBandsStrategy.includes('Sell') ? 1 : 1);

    // Set background colors based on recommendation strategy
    const movingAvgColor = this.movingAverageStrategy.includes('Buy') 
        ? '#3e95cd' // Blue for Buy
        : (this.movingAverageStrategy.includes('Sell') ? '#8e5ea2' : '#3cba9f'); // Purple for Sell, Green for Hold

    const rsiColor = this.rsiStrategy.includes('Buy') 
        ? '#3e95cd' // Blue for Buy
        : (this.rsiStrategy.includes('Sell') ? '#8e5ea2' : '#3cba9f'); // Purple for Sell, Green for Hold

    const bollingerColor = this.bollingerBandsStrategy.includes('Buy') 
        ? '#3e95cd' // Blue for Buy
        : (this.bollingerBandsStrategy.includes('Sell') ? '#8e5ea2' : '#3cba9f'); // Purple for Sell, Green for Hold

    console.log('Updating recommendation chart with values:', { movingAvgSignal, rsiSignal, bollingerSignal });

    // Update the chart data and background colors
    this.chart.data.datasets[0].data = [movingAvgSignal, rsiSignal, bollingerSignal];
    this.chart.data.datasets[0].backgroundColor = [movingAvgColor, rsiColor, bollingerColor];

    this.chart.update(); // Trigger chart update
}




}
