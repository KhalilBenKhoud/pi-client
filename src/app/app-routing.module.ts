import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TradingComponent } from './trading/trading.component';
import { NonauthGuard } from './nonauth.guard';
import { AuthGuard } from './auth.guard';
import { PredictionComponent } from './prediction/prediction.component';
import { AcademyComponent } from './academy/academy.component';

const routes: Routes = [
  {path : "", component: HomeComponent, pathMatch: 'full' },
  {path : "home", component: HomeComponent },
  {path : "login", component: LoginComponent, canActivate: [NonauthGuard] },
  {path : "register", component: RegisterComponent, canActivate: [NonauthGuard]},
  {path : "trading" , component : TradingComponent , canActivate: [AuthGuard]},
  {path : "prediction" , component : PredictionComponent , canActivate: [AuthGuard]},
  {path : "academy" , component : AcademyComponent , canActivate: [AuthGuard], pathMatch: 'full'},
  {path : "academy/:id" , component : AcademyComponent , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
