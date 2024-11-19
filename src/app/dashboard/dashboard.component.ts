import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { animations } from '../utils/animations';
import { PortfolioService } from '../services/portfolio.service'; // Import PortfolioService



@Component({
  selector: 'app-Dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers :  [MessageService],
  animations: animations
 
})
export class dashboardComponent implements OnInit{
  balance: number | undefined;  // Define balance variable

  constructor(
    private portfolioService: PortfolioService,  // Inject PortfolioService
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPortfolioBalance();  // Fetch balance on initialization
  }

  getPortfolioBalance(): void {
    this.portfolioService.getBalance().subscribe(
      (response: any) => {
        this.balance = response; // Store the fetched balance
      },
      error => {
        console.error('Error fetching balance', error);
      }
    );
  }
}