import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { InputTextModule } from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {SelectButtonModule} from 'primeng/selectbutton';



import { FormsModule } from '@angular/forms';
import { TradingComponent } from './trading/trading.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthGuard } from './auth.guard';
import { NonauthGuard } from './nonauth.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PredictionComponent } from './prediction/prediction.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { RiskComponent } from './risk/risk.component';
import { StrategyComponent } from './strategy/strategy.component';
import { AnalystRecComponent } from './analyst-rec/analyst-rec.component';
import { AllComponent } from './all/all.component';

import { StockChartsComponent } from './stock-charts/stock-charts.component';
import { AcademyComponent } from './academy/academy.component';
import { SafePipe } from './safe.pipe';
import { NbChatModule, NbThemeModule } from '@nebular/theme';
import {NbStepperModule, NbCardModule, NbButtonModule,NbLayoutModule} from '@nebular/theme';
import { QuizComponent } from './academy/quiz/quiz.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { dashboardComponent } from './dashboard/dashboard.component';
//import { ChartModule } from 'primeng/chart';


import { ForcastingComponent } from './forcasting/forcasting.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { TradingPanelComponent } from './trading-panel/trading-panel.component';
import { CalendarModule } from 'primeng/calendar';
import { VarCalculatorComponent } from './var-calculator/var-calculator.component';
import { CardModule } from 'primeng/card';
import { MonteCarloComponent } from './monte-carlo/monte-carlo.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScenarioReplayComponentComponent } from './scenario-replay-component/scenario-replay-component.component';
import { MarketChartComponentComponent } from './market-chart-component/market-chart-component.component';
import { UserTradePanelComponentComponent } from './user-trade-panel-component/user-trade-panel-component.component';
import { PerformanceDashboardComponentComponent } from './performance-dashboard-component/performance-dashboard-component.component';
import { HistoricalDataTableComponentComponent } from './historical-data-table-component/historical-data-table-component.component';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { MonteCarloStreamlitComponent } from './monte-carlo-streamlit/monte-carlo-streamlit.component';



import { OrderListModule } from 'primeng/orderlist';
import { NotificationsComponent } from './notifications/notifications.component';
import { TrainingComponent } from './training/training.component';
import { CurrencyComponent } from './currency/currency.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { NotesComponent } from './notes/notes.component';
import { QuillModule } from 'ngx-quill';
import { NewsComponent } from './news/news.component'
import { DragDropModule } from 'primeng/dragdrop';
import { CommonModule } from '@angular/common';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { DialogModule } from 'primeng/dialog';
import { PriceRecommendationComponent } from './price-recommendation/price-recommendation.component';
import { CopyTradeComponent } from './copy-trade/copy-trade.component';

import {SidebarModule} from 'primeng/sidebar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    TradingComponent,
    PredictionComponent,
    ComparisonComponent,
    RiskComponent,
    StrategyComponent,
    AnalystRecComponent,
    AllComponent,
    
    
  
    AcademyComponent,
    SafePipe,
    QuizComponent,
    

    StockChartsComponent,
    AcademyComponent,
    SafePipe,
    QuizComponent,
    NotificationsComponent,
    dashboardComponent,
    ForcastingComponent,
    PlaceOrderComponent,
    UserOrdersComponent,
    TradingPanelComponent,
    VarCalculatorComponent,
    MonteCarloComponent,
    ScenarioReplayComponentComponent,
    MarketChartComponentComponent,
    UserTradePanelComponentComponent,
    PerformanceDashboardComponentComponent,
    HistoricalDataTableComponentComponent,
    MonteCarloStreamlitComponent,
    NotificationsComponent,
    TrainingComponent,
    CurrencyComponent,
    ChatbotComponent,
    NotesComponent,
    NewsComponent,
    OrderHistoryComponent,
    StockChartComponent,
    PriceRecommendationComponent,
    CopyTradeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    SelectButtonModule,
    HttpClientModule,
    CarouselModule,
    FontAwesomeModule,
    NbThemeModule.forRoot(),
    NbStepperModule,
    NbCardModule, 
    NbButtonModule,
    NbLayoutModule,
    RadioButtonModule,
    OrderListModule,
  //  ChartModule
    MessagesModule,
    MessageModule,
    TableModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    CardModule,
    MatSnackBarModule,
    ChartModule,
    ProgressSpinnerModule,
    OrderListModule,
    NbChatModule,
    DragDropModule,
    CommonModule,
    QuillModule.forRoot(),
    TableModule,
    DialogModule,
    SidebarModule
      
    
  ],
  providers: [    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } , AuthGuard , NonauthGuard , [MessageService]],
  bootstrap: [AppComponent]
})
export class AppModule { }
