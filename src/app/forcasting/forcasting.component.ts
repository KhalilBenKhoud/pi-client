import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ForcastingService } from '../services/forcasting.service';
import { createChart, IChartApi, ISeriesApi, Time } from 'lightweight-charts';

@Component({
  selector: 'app-forcasting',
  templateUrl: './forcasting.component.html',
  styleUrls: ['./forcasting.component.css']
})
export class ForcastingComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  stocks: string[] = [];
  selectedStock: string = '';
  forecastYears: number = 1;
  historicalData: any[] = [];
  forecastData: any[] = [];
  errorMessage: string = '';
  stockOptions = this.stocks.map(stock => ({ label: stock, value: stock }));


  private chart!: IChartApi;
  private series!: ISeriesApi<'Line'>;

  constructor(private forecastService: ForcastingService) {}

  ngOnInit(): void {
    this.loadAvailableStocks();
  }

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  loadAvailableStocks(): void {
    this.forecastService.getAvailableStocks().subscribe(
      (stocks) => {
        this.stocks = stocks;
      },
      (error) => {
        console.error('Error fetching stocks:', error);
        this.errorMessage = 'Error fetching stocks.';
      }
    );
  }

  getForecast(): void {
    if (!this.selectedStock) return;

    this.forecastService.getForecast(this.selectedStock, this.forecastYears).subscribe(
      (data) => {
        this.historicalData = data.historical;
        this.forecastData = data.forecast;
        this.updateChart();
      },
      (error) => {
        console.error('Error fetching forecast:', error);
        this.errorMessage = 'Error fetching forecast.';
      }
    );
  }

  private initializeChart(): void {
    this.chart = createChart(this.chartContainer.nativeElement, {
      width: this.chartContainer.nativeElement.clientWidth,
      height: 400,
      //layout: { backgroundColor: '#ffffff', textColor: '#000' },
      crosshair: { mode: 1 },
      timeScale: { borderColor: '#cccccc' },
    });

    this.series = this.chart.addLineSeries({
      color: '#2196f3',
      lineWidth: 2,
    });
  }

  private updateChart(): void {
    const formattedData = this.forecastData.map((item) => ({
      time: (new Date(item.ds).getTime() / 1000) as Time, // Convert to UNIX timestamp and cast to Time
      value: item.yhat,
    }));

    this.series.setData(formattedData);
    this.chart.timeScale().fitContent();  // Adjust the chart to fit data
  }
}
