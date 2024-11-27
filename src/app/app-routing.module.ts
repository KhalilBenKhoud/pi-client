import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TradingComponent } from './trading/trading.component';
import { NonauthGuard } from './nonauth.guard';
import { AuthGuard } from './auth.guard';
import { StockChartsComponent } from './stock-charts/stock-charts.component';
import { AcademyComponent } from './academy/academy.component';
import { dashboardComponent } from './dashboard/dashboard.component';

import { ForcastingComponent } from './forcasting/forcasting.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { TradingPanelComponent } from './trading-panel/trading-panel.component';
import { VarCalculatorComponent } from './var-calculator/var-calculator.component';

const routes: Routes = [
  {path : "", component: HomeComponent, pathMatch: 'full' },
  {path : "home", component: HomeComponent },
  {path : "chart", component: StockChartsComponent },
  {path : "forecast", component: ForcastingComponent },
  {path : "var-calculator", component: VarCalculatorComponent },
  {path : "place-order", component: TradingPanelComponent},
  {path : "user-orders", component: UserOrdersComponent, canActivate: [NonauthGuard]},
  {path : "login", component: LoginComponent, canActivate: [NonauthGuard] },
  {path : "register", component: RegisterComponent, canActivate: [NonauthGuard]},
  {path : "trading" , component : TradingPanelComponent , canActivate: [AuthGuard]},
  {path : "academy" , component : AcademyComponent , canActivate: [AuthGuard], pathMatch: 'full'},
  {path : "dashboard" , component : dashboardComponent , canActivate: [AuthGuard], pathMatch: 'full'},

  {path : "academy/:id" , component : AcademyComponent , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
