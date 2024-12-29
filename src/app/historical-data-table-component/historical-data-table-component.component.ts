import { Component, Input, OnInit, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { createChart, IChartApi, ISeriesApi, BarData } from 'lightweight-charts';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-historical-data-table-component',
  templateUrl: './historical-data-table-component.component.html',
  styleUrls: ['./historical-data-table-component.component.css'],
  providers: [MessageService],
})
export class HistoricalDataTableComponentComponent implements OnInit, OnChanges {
  @Input() scenarioId: number = 0;
  @Input() historicalData: any[] = [];
  @Input() loading: boolean = true;
  @Input() errorMessage: string = '';
  @Input() selectedTimeframe: string = '5min';

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private chart!: IChartApi;
  private candlestickSeries!: ISeriesApi<'Candlestick'>;

  // Initialize the trade form
  tradeForm: { symbol: string; action: string; quantity: number; price: number } = {
    symbol: '',
    action: 'buy',
    quantity: 0,
    price: 0,
  };

  timeframes: { label: string; value: string }[] = [
    { label: '1 Minute', value: '1min' },
    { label: '5 Minutes', value: '5min' },
    { label: '15 Minutes', value: '15min' },
    { label: '1 Hour', value: '1hour' },
  ];

  constructor(private http: HttpClient, private messageService: MessageService) {}

  ngOnInit(): void {
    if (this.scenarioId) {
      this.fetchHistoricalData();
      this.initializeChart();
    }
  }

  ngOnChanges(): void {
    if (this.chart && this.historicalData.length) {
      this.updateChart();
    }
  }

  fetchHistoricalData(): void {
    this.loading = true;
    this.http
      .get<any[]>(
        `http://127.0.0.1:8000/scenarios/data/${this.scenarioId}?timeframe=${this.selectedTimeframe}`
      )
      .subscribe({
        next: (data) => {
          this.historicalData = data.map((entry) => ({
            time: new Date(entry.date).getTime() / 1000, // Convert to UNIX timestamp
            open: entry.open,
            high: entry.high,
            low: entry.low,
            close: entry.close,
          }));
          this.loading = false;
          this.updateChart();
        },
        error: (error) => {
          this.errorMessage = 'Failed to load historical data';
          this.loading = false;
          this.showError(this.errorMessage);
        },
      });
  }

  initializeChart(): void {
    if (!this.chartContainer) return;

    this.chart = createChart(this.chartContainer.nativeElement, {
      width: this.chartContainer.nativeElement.offsetWidth,
      height: 400,
      layout: {
        //backgroundColor: '#FFFFFF',
        textColor: '#000000',
      },
      grid: {
        vertLines: {
          color: '#E5E5E5',
        },
        horzLines: {
          color: '#E5E5E5',
        },
      },
    });

    this.candlestickSeries = this.chart.addCandlestickSeries({
      upColor: '#4CAF50',
      downColor: '#FF5252',
      borderDownColor: '#FF5252',
      borderUpColor: '#4CAF50',
      wickDownColor: '#FF5252',
      wickUpColor: '#4CAF50',
    });
  }

  updateChart(): void {
    if (this.candlestickSeries) {
      this.candlestickSeries.setData(this.historicalData);
    }
  }

  placeTrade(): void {
    const tradePayload = {
      scenario_id: this.scenarioId,
      symbol: this.tradeForm.symbol,
      action: this.tradeForm.action,
      quantity: this.tradeForm.quantity,
      price: this.tradeForm.price,
    };

    this.http.post(`http://127.0.0.1:8000/historical/trades`, tradePayload).subscribe({
      next: () => {
        this.showSuccess('Trade placed successfully!');
        this.resetTradeForm();
      },
      error: () => {
        this.showError('Failed to place trade');
      },
    });
  }

  resetTradeForm(): void {
    this.tradeForm = {
      symbol: '',
      action: 'buy',
      quantity: 0,
      price: 0,
    };
  }

  showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
