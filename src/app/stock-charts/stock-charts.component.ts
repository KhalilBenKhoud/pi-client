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

  constructor(private candlestickService: ChartService, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.initializeChart();
    this.loadData('AAPL', '1hour');  // Example symbol and timeframe
    this.loadTradingViewWidget();
  }

  // Initialize the TradingView candlestick chart
  private initializeChart(): void {
    const chartOptions = {
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' }, // Correct background type
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

  // Load data from the backend and set it in the chart
  private loadData(symbol: string, timeframe: string): void {
    this.candlestickService.getIntradayData(symbol, timeframe).subscribe(
      (data) => {
        const formattedData = data.map((item) => ({
          time: (new Date(item.date).getTime() / 1000) as Time, // Ensure time is of type 'Time'
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }));

        this.candlestickSeries.setData(formattedData);
        this.chart.timeScale().fitContent();  // Adjust the chart view to fit all data
      },
      (error) => {
        console.error('Error loading candlestick data:', error);
      }
    );
  }

  // Dynamically load the TradingView widget script
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
