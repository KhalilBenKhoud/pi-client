import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { ChartService } from '../services/chart.service';
import { createChart, IChartApi, ISeriesApi, Time, ColorType } from 'lightweight-charts';

@Component({
  selector: 'app-stock-charts',
  templateUrl: './stock-charts.component.html',
  styleUrls: ['./stock-charts.component.css']
})
export class StockChartsComponent implements AfterViewInit {

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private chart!: IChartApi;
  private candlestickSeries!: ISeriesApi<'Candlestick'>;
  
  ticker: string = 'AAPL';  // Default ticker
  timeframe: string = '5min';  // Default timeframe
  fromDate: string = '';  // Optional start date
  toDate: string = '';  // Optional end date

  timeframeOptions = [
    { label: '1 Minute', value: '1min' },
    { label: '5 Minutes', value: '5min' },
    { label: '15 Minutes', value: '15min' },
    { label: '30 Minutes', value: '30min' },
    { label: '1 Hour', value: '1hour' },
    { label: '4 Hours', value: '4hour' },
  ];

  constructor(private chartService: ChartService, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.initializeChart();
    this.loadData(); // Initial load of data
    this.loadTradingViewWidget();
  }

  // Initialize the chart with options
  private initializeChart(): void {
    const chartOptions = {
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: 'black',
      },
      width: this.chartContainer.nativeElement.clientWidth,
      height: 400,
      crosshair: { mode: 1 },
    };

    this.chart = createChart(this.chartContainer.nativeElement, chartOptions);
    this.candlestickSeries = this.chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });
  }

  // Load data from the backend and ensure it's sorted before passing to the chart
private loadData(): void {
  this.chartService
    .getIntradayData(this.ticker, this.timeframe, this.fromDate, this.toDate)
    .subscribe(
      (data) => {
        // Sort data by date in ascending order (oldest first)
        const sortedData = data.sort((a: any, b: any) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        const formattedData = sortedData.map((item: any) => ({
          time: (new Date(item.date).getTime() / 1000) as Time, // Convert to UNIX timestamp
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }));

        this.candlestickSeries.setData(formattedData);
        this.chart.timeScale().fitContent(); // Adjust chart view to fit all data
      },
      (error: any) => {
        console.error('Error loading candlestick data:', error);
      }
    );
}


  // Handle the fetch button click
  onFetchData(): void {
    if (this.ticker && this.timeframe) {
      this.loadData();
    }
  }

  // Dynamically load the TradingView widget
  private loadTradingViewWidget(): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';

    script.text = `
      {
        "symbols": [
          { "description": "", "proName": "NASDAQ:NVDA" },
          { "description": "", "proName": "NASDAQ:TSLA" },
          { "description": "", "proName": "NASDAQ:AAPL" },
          { "description": "", "proName": "NASDAQ:MSFT" },
          { "description": "", "proName": "NASDAQ:AMZN" },
          { "description": "", "proName": "NASDAQ:META" },
          { "description": "", "proName": "NASDAQ:NFLX" },
          { "description": "", "proName": "NASDAQ:GOOGL" }
        ],
        "showSymbolLogo": true,
        "isTransparent": false,
        "displayMode": "adaptive",
        "colorTheme": "light",
        "locale": "en"
      }
    `;

    this.renderer.appendChild(this.chartContainer.nativeElement, script);
  }
}
