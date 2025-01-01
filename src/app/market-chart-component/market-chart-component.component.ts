import { Component, Input, OnChanges, OnDestroy, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import {
  Chart,
  registerables,
} from 'chart.js';
import { CandlestickController, CandlestickElement, OhlcElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';

// Register required Chart.js components
Chart.register(...registerables, CandlestickController, CandlestickElement, OhlcElement);

@Component({
  selector: 'app-market-chart-component',
  templateUrl: './market-chart-component.component.html',
  styleUrls: ['./market-chart-component.component.css']
})
export class MarketChartComponentComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @Input() data: any[] = [];
  @Input() userTrades: any[] = [];
  @Input() expertTrades: any[] = [];
  chartInstance: any;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.generateChart();
    }
  }

  ngAfterViewInit(): void {
    this.generateChart();
  }

  generateChart(): void {
    if (!this.chartCanvas) {
      return;
    }

    const formattedData = this.data.map((data) => ({
      x: new Date(data.timestamp),
      y: data.price,
    }));

    const expertTradesPoints = this.expertTrades.map((trade) => ({
      x: new Date(trade.timestamp),
      y: trade.price,
      label: `Expert ${trade.action.toUpperCase()}`
    }));

    const userTradesPoints = this.userTrades.map((trade) => ({
      x: new Date(trade.timestamp),
      y: trade.price,
      label: `User ${trade.action.toUpperCase()}`
    }));

    this.chartInstance = new Chart(this.chartCanvas.nativeElement, {
      type: 'candlestick',
      data: {
        datasets: [
          {
            label: 'Market Data',
            data: formattedData,
            type: 'candlestick',
            borderColor: '#42A5F5',
            backgroundColor: '#90CAF9',
          },
          {
            label: 'Expert Trades',
            data: expertTradesPoints as any,
          },
          {
            label: 'User Trades',
            data: userTradesPoints as any,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }
}