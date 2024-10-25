import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createChart, IChartApi } from 'lightweight-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  chart!: IChartApi;
  candlestickSeries!: any;

  ticker: string = 'AAPL';        // Default ticker
  timeframe: string = '5min';     // Default timeframe
  fromDate: string = '';          // From date
  toDate: string = '';            // To date

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chart = createChart(this.chartContainer.nativeElement, {
      width: 800,
      height: 400,
      grid: {
        vertLines: { color: '#404040' },
        horzLines: { color: '#404040' }
      },
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: '#cccccc' },
      timeScale: { borderColor: '#cccccc' },
    });

    this.candlestickSeries = this.chart.addCandlestickSeries();
  }

  onFetchData(): void {
    // Call the fetch function with user inputs
    this.fetchIntradayData(this.ticker, this.timeframe, this.fromDate, this.toDate);
  }

  fetchIntradayData(symbol: string, timeframe: string, fromDate: string, toDate: string): void {
    // Adjust API URL to match the required format
    const apiUrl = `http://127.0.0.1:8000/market/intraday/${symbol}?timeframe=${timeframe}&from=${fromDate}&to=${toDate}`;

    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        console.log(data);
        // Map the response to the format expected by Lightweight Charts
        const formattedData = data.map(item => ({
          time: new Date(item.date).toISOString().split('T')[0],  // Convert to ISO date format
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }));
        
        this.candlestickSeries.setData(formattedData);
      },
      (error) => {
        console.error('Error fetching intraday data:', error);
      }
    );
  }
}
