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
import {ToastModule} from 'primeng/toast'
import {SelectButtonModule} from 'primeng/selectbutton'

import { FormsModule } from '@angular/forms';
import { TradingComponent } from './trading/trading.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthGuard } from './auth.guard';
import { NonauthGuard } from './nonauth.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AcademyComponent } from './academy/academy.component';
import { SafePipe } from './safe.pipe';
import { NbChatModule, NbThemeModule } from '@nebular/theme';
import {NbStepperModule, NbCardModule, NbButtonModule,NbLayoutModule} from '@nebular/theme';
import { QuizComponent } from './academy/quiz/quiz.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { OrderListModule } from 'primeng/orderlist';
import { NotificationsComponent } from './notifications/notifications.component';
import { TrainingComponent } from './training/training.component';
import { CurrencyComponent } from './currency/currency.component';
import { ChatbotComponent } from './chatbot/chatbot.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    TradingComponent,
    AcademyComponent,
    SafePipe,
    QuizComponent,
    NotificationsComponent,
    TrainingComponent,
    CurrencyComponent,
    ChatbotComponent
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
    NbChatModule
  ],
  providers: [    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } , AuthGuard , NonauthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
