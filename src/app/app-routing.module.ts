import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TradingComponent } from './trading/trading.component';
import { NonauthGuard } from './nonauth.guard';
import { AuthGuard } from './auth.guard';
import { PredictionComponent } from './prediction/prediction.component';
import { AllComponent } from './all/all.component';
import { StockChartsComponent } from './stock-charts/stock-charts.component';
import { AcademyComponent } from './academy/academy.component';
import { ForcastingComponent } from './forcasting/forcasting.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { TradingPanelComponent } from './trading-panel/trading-panel.component';
import { VarCalculatorComponent } from './var-calculator/var-calculator.component';
import { MonteCarloComponent } from './monte-carlo/monte-carlo.component';
import { ScenarioReplayComponentComponent } from './scenario-replay-component/scenario-replay-component.component';
import { PerformanceDashboardComponentComponent } from './performance-dashboard-component/performance-dashboard-component.component';
import { MarketChartComponentComponent } from './market-chart-component/market-chart-component.component';
import { HistoricalDataTableComponentComponent } from './historical-data-table-component/historical-data-table-component.component';
import { TrainingComponent } from './training/training.component';
import { CurrencyComponent } from './currency/currency.component';
import { NotesComponent } from './notes/notes.component';
import { NewsComponent } from './news/news.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { PriceRecommendationComponent } from './price-recommendation/price-recommendation.component';
import { CopyTradeComponent } from './copy-trade/copy-trade.component';
const routes: Routes = [
  {path : "", component: HomeComponent, pathMatch: 'full' },
  {path : "home", component: HomeComponent },

  {path : "scenario-replay", component: ScenarioReplayComponentComponent },
  {path : "performance-dashboard", component: PerformanceDashboardComponentComponent },
  {path : "chart-scenario", component: MarketChartComponentComponent },
  {path : "historical-data", component: HistoricalDataTableComponentComponent },

  {path : "chart", component: StockChartsComponent },
  {path : "monte-carlo", component: MonteCarloComponent },
  {path : "forecast", component: ForcastingComponent },
  {path : "var-calculator", component: VarCalculatorComponent },
  {path : "place-order", component: TradingPanelComponent},
  {path : "user-orders", component: UserOrdersComponent, canActivate: [NonauthGuard]},
  {path : "login", component: LoginComponent, canActivate: [NonauthGuard] },
  {path : "register", component: RegisterComponent, canActivate: [NonauthGuard]},
  {path : "trading" , component : TradingPanelComponent , canActivate: [AuthGuard]},
  {path : "trading" , component : TradingComponent , canActivate: [AuthGuard]},
  {path : "prediction" , component : PredictionComponent , canActivate: [AuthGuard]},
  {path : "all" , component : AllComponent , canActivate: [AuthGuard]},



  {path : "training" , component : TrainingComponent , canActivate: [AuthGuard]},
  {path : "currency" , component : CurrencyComponent , canActivate: [AuthGuard]},
  {path : "notes" , component : NotesComponent , canActivate: [AuthGuard]},
  {path : "news" , component : NewsComponent , canActivate: [AuthGuard]},
  {path : "academy" , component : AcademyComponent , canActivate: [AuthGuard], pathMatch: 'full'},
  {path : "academy/:id" , component : AcademyComponent , canActivate: [AuthGuard]},
  {path : "history" , component : OrderHistoryComponent , canActivate: [AuthGuard]},
  {path : "market" , component : StockChartComponent , canActivate: [AuthGuard]},
  {path : "price" , component : PriceRecommendationComponent , canActivate: [AuthGuard]},
  {path : "copy" , component : CopyTradeComponent , canActivate: [AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
