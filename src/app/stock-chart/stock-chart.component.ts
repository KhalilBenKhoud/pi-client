import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { StockDataService } from '../services/stock-data.service';
import { createChart, IChartApi } from 'lightweight-charts';
import { PriceRecommenderService } from '../services/price-recommender.service';

interface CandlestickData {
  time: number | string;
  open: number;
  high: number;
  low: number;
  close: number;
}
interface StockData {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
}

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})
export class StockChartComponent implements OnInit, OnDestroy, AfterViewInit {
  stockSymbol: string = ''; 
  selectedInterval: string = '1d'; 
  errorMessage: string = ''; 
  stockData: any = null; 
  orderQuantity: number = 1; 
  orderPositionType: string = 'long'; 

  showPriceRecommendationDialog: boolean = false;
  priceRecommendation: number | null = null;
  recommended_price: number = 0; 
  assets: any[] = []; 
  candles: CandlestickData[] = []; 

  private chart: IChartApi | null = null;
  private candleSeries: any;

  constructor(private stockDataService: StockDataService, private recommenderService: PriceRecommenderService) {}

  ngAfterViewInit() {
    this.initializeChart();
  }

  ngOnInit() {
    this.loadAssets();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.remove();
    }
  }

  initializeChart() {
    this.chart = createChart('tv_chart_container', {
      width: document.getElementById('tv_chart_container')?.clientWidth || 800,
      height: 500,
      layout: {
        textColor: '#333',
      },
      grid: {
        vertLines: {
          color: '#f0f0f0',
        },
        horzLines: {
          color: '#f0f0f0',
        },
      },
      crosshair: {
        mode: 0,
      },
      timeScale: {
        borderColor: '#cccccc',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    this.candleSeries = this.chart.addCandlestickSeries();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    if (this.chart) {
      this.chart.applyOptions({
        width: document.getElementById('tv_chart_container')?.clientWidth || 800,
      });
    }
  }

  loadStockData() {
    if (!this.stockSymbol) {
      this.errorMessage = "Le symbole de stock est requis!";
      return;
    }

    this.stockDataService.getStockData(this.stockSymbol, this.selectedInterval).subscribe(
      (response: any) => {
        console.log('API response:', response);
        this.processStockData(response?.data);
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = "Erreur lors de la récupération des données.";
        console.error(error);
      }
    );
  }

  processStockData(data: Record<string, StockData> | null | undefined) {
    if (!data) {
      this.errorMessage = 'Aucune donnée de stock disponible.';
      console.error('Stock data is undefined or null.');
      return;
    }

    const candles: CandlestickData[] = [];

    for (const [date, value] of Object.entries(data)) {
      const stockValue = value as StockData;

      const timestamp = new Date(date).getTime() / 1000;
      const open = parseFloat(stockValue['1. open'] || '0');
      const high = parseFloat(stockValue['2. high'] || '0');
      const low = parseFloat(stockValue['3. low'] || '0');
      const close = parseFloat(stockValue['4. close'] || '0');

      if (!isNaN(open) && !isNaN(close) && !isNaN(high) && !isNaN(low)) {
        candles.push({ time: timestamp, open, high, low, close });
        const average = (open + close) / 2;
        console.log('Average:', average);
      } else {
        console.error('Invalid stock data:', stockValue);
      }
    }

    candles.sort((a, b) => (a.time as number) - (b.time as number));
    this.candles = candles;

    if (this.candleSeries) {
      this.candleSeries.setData(this.candles);
      this.chart?.timeScale().fitContent();
    }
  }

  buyStock() {
    const order = {
      symbol: this.stockSymbol,
      quantity: this.orderQuantity,
      order_position_type: this.orderPositionType
    };

    this.stockDataService.createBuyOrder(order).subscribe(
      response => {
        console.log('Buy order created', response);
        this.loadAssets();
      },
      error => {
        this.errorMessage = 'Erreur lors de l\'achat du stock.';
        console.error('Error creating buy order', error);
      }
    );
  }

  sellStock() {
    const order = {
      symbol: this.stockSymbol,
      quantity: this.orderQuantity
    };

    this.stockDataService.createSellOrder(order).subscribe(
      response => {
        console.log('Sell order created', response);
        this.loadAssets();
      },
      error => {
        this.errorMessage = 'Erreur lors de la vente du stock.';
        console.error('Error creating sell order', error);
      }
    );
  }

  loadAssets() {
    this.stockDataService.getAssets().subscribe(
      (response: any) => {
        this.assets = response;
        console.log("Assets loaded:", this.assets);
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération des assets.';
        console.error("Error loading assets", error);
      }
    );
  }

  openPriceRecommendationDialog(): void {
    this.showPriceRecommendationDialog = true;
    this.getRecommendation();
  }

  closePriceRecommendationDialog(): void {
    this.showPriceRecommendationDialog = false;
  }

  
  recommendation: any;
  error: string | null = null;
  getRecommendation(): void {
    if (this.stockSymbol) {
      this.recommenderService.getRecommendation(this.stockSymbol)
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
  visible: boolean = false;
  sidebarWidth: string = '5000px';
  // Ouvrir le Sidebar
  openSidebar() {
    this.visible = true;
  }

  // Fermer le Sidebar
  closeSidebar() {
    this.visible = false;
  }
}
