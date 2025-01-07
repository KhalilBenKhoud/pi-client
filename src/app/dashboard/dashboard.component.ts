import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { animations } from '../utils/animations';
import { PortfolioService } from '../services/portfolio.service'; // Import PortfolioService
import { Chart } from 'chart.js/auto'



@Component({
  selector: 'app-Dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers :  [MessageService],
  animations: animations
 
})
export class dashboardComponent implements OnInit{
  balance: number | undefined;  // Define balance variable
   percentages : any[] = [] ;
  rankedUsers : any[] = [] ;
  price_target: number | undefined;
  symbol: string | undefined;
  direction: string | undefined;
  priceAlerts: any[] = [] ;
  
   constructor(
    private portfolioService: PortfolioService,  // Inject PortfolioService
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPortfolioBalance() ; 
    this.getPortfolioPercentages() ;
     this.getRanking() ;
     this.getPriceAlerts();
  }

  
  createPieChart() {
    const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.percentages.map((percentage) => percentage.symbol), // Asset symbols
        datasets: [
          {
            data: this.percentages.map((percentage) => percentage.percentage), // Percentages
            backgroundColor: this.percentages.map(() => this.getRandomColor()), // Optional: Generate colors
            borderWidth: 1,
          },
        ],
      },
  
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          }
        }
      }
    });
  }


  getPortfolioBalance(): void {
    this.portfolioService.getBalance().subscribe(
      (response: any) => {
        this.balance = response.balance; // Store the fetched balance
      },
      error => {
        console.error('Error fetching balance', error);
      }
    );
  }

  getPortfolioPercentages(): void {
    this.portfolioService.getPortfolioPercentages().subscribe(
      (response: any) => {
        this.percentages = response.asset_percentages; // Store the fetched percentages
        console.log(this.percentages) ;
        this.createPieChart();

      },
      error => {
        console.error('Error fetching percentages', error);
      }
    );
  }

  getRanking() : void {
    this.portfolioService.getRanking().subscribe(
      (response: any) => {
        this.rankedUsers = [...response.user_ranks]; // Store the fetched ranking
      },
      error => {
        console.error('Error fetching ranking', error);
      }
    );
  }

  getRandomColor(): string {
    // Helper function to generate random colors for the chart
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

  createPriceAlert(): void { 
     let data = {
      symbol: this.symbol,
      price_target: this.price_target,
      direction: this.direction
     } 
     this.portfolioService.addPriceAlert(data).subscribe(data => {
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Price alert created successfully'});
      this.getPriceAlerts();
     },
      error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to create price alert'});
      });
  }

  getPriceAlerts(): void {  
    this.portfolioService.getAllPriceAlerts().subscribe(
      (response: any) => {
        this.priceAlerts = [...response];
      },
      error => {
        console.error('Error fetching price alerts', error);
      }
    );}

    deletePriceAlert(id: string): void {  
      this.portfolioService.deletePriceAlert(id).subscribe(data => {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Price alert deleted successfully'});
        this.getPriceAlerts();
      },error => {  this.messageService.add({severity:'error', summary: 'Error', detail: 'Failed to delete price alert'});})
    }

  
  
}