import { Component, OnInit } from '@angular/core';
import { ScenarioService } from '../services/scenario.service';
import { TradeService } from '../services/trade.service';
import { MessageService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-scenario-replay-component',
  templateUrl: './scenario-replay-component.component.html',
  styleUrls: ['./scenario-replay-component.component.css'],
  providers: [MessageService],
})
export class ScenarioReplayComponentComponent implements OnInit {
  scenarios: any[] = [];
  selectedScenario: any;
  historicalData: any[] = [];
  userTrades: any[] = [];
  expertTrades: any[] = [];
  performanceMetrics: any = {
    total_trades: 0,
    winning_trades: 0,
    win_ratio: 0,
    total_profit_loss: 0,
    recommendation_match_ratio: 0,
    average_timing_efficiency: 0,
  };
  errorMessage: string = '';
  loading = false;
  tradeForm = {
    symbol: '',
    action: '',
    quantity: 0,
    price: 0,
  };

  constructor(
    private scenarioService: ScenarioService,
    private tradeService: TradeService,
    private messageService: MessageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchScenarios();
    this.fetchTradeHistory();
  }

  fetchTradeHistory(): void {
    this.loading = true;
    this.tradeService.getUserTrades().subscribe(
      (trades) => {
        this.userTrades = trades;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load trade history';
        this.loading = false;
      }
    );
  }

  fetchScenarios(): void {
    this.scenarioService.getScenarios().subscribe(
      (data) => {
        this.scenarios = data;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load scenarios.',
        });
      }
    );
  }

  loadScenarioData(): void {
    if (!this.selectedScenario) return;

    this.loading = true;
    this.scenarioService.getHistoricalData(this.selectedScenario.id).subscribe(
      (data) => {
        this.historicalData = data;
        this.loading = false;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load historical data.',
        });
        this.loading = false;
      }
    );
  }

  placeTrade(): void {
    if (!this.tradeForm.symbol || !this.tradeForm.action || !this.tradeForm.quantity || !this.tradeForm.price) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Incomplete Form',
        detail: 'Please fill out all fields before placing a trade.',
      });
      return;
    }

    const trade = {
      scenario_id: this.selectedScenario.id,
      ...this.tradeForm,
    };

    this.tradeService.placeTrade(trade).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Trade Placed',
          detail: 'Your trade has been successfully recorded.',
        });
        this.userTrades.push({ ...trade, timestamp: new Date() });
        this.tradeForm = { symbol: '', action: '', quantity: 0, price: 0 };
        this.showSuccess('Trade placed successfully!');
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to place trade.',
        });
        this.showError('Error placing trade.');
      }
    );
  }

  analyzePerformance(): void {
    if (!this.selectedScenario) {
      this.messageService.add({
        severity: 'warn',
        summary: 'No Scenario Selected',
        detail: 'Please select a scenario to analyze performance.',
      });
      return;
    }

    this.loading = true;
    this.scenarioService.getPerformanceAnalysis(this.selectedScenario.id).subscribe(
      (data) => {
        this.performanceMetrics = data.performance || this.performanceMetrics;
        this.userTrades = data.user_trades || [];
        this.expertTrades = data.expert_trades || [];
        this.loading = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Analysis Complete',
          detail: 'Performance metrics loaded successfully.',
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Analysis Failed',
          detail: 'Failed to analyze performance. Please try again later.',
        });
        this.performanceMetrics = {
          total_trades: 0,
          winning_trades: 0,
          win_ratio: 0,
          total_profit_loss: 0,
          recommendation_match_ratio: 0,
          average_timing_efficiency: 0,
        };
        this.userTrades = [];
        this.expertTrades = [];
        this.loading = false;
      }
    );
  }

    // Show success alert
    private showSuccess(message: string): void {
      this.snackBar.open(message, 'Close', {
        duration: 3000, // 3 seconds
        panelClass: ['success-snackbar'] // Custom class for styling
      });
    }
  
    // Show error alert
    private showError(message: string): void {
      this.snackBar.open(message, 'Close', {
        duration: 3000, // 3 seconds
        panelClass: ['error-snackbar'] // Custom class for styling
      });
    }
}
