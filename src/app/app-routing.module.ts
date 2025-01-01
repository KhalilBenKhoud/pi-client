import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TradingComponent } from './trading/trading.component';
import { NonauthGuard } from './nonauth.guard';
import { AuthGuard } from './auth.guard';
import { AcademyComponent } from './academy/academy.component';
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
  {path : "login", component: LoginComponent, canActivate: [NonauthGuard] },
  {path : "register", component: RegisterComponent, canActivate: [NonauthGuard]},
  {path : "trading" , component : TradingComponent , canActivate: [AuthGuard]},
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
