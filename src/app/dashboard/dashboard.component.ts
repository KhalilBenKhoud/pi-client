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

  constructor(
    private portfolioService: PortfolioService,  // Inject PortfolioService
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPortfolioBalance();  // Fetch balance on initialization
    
  }

  ngAfterViewInit() : void {
    this.createPieChart() ;
  }
  createPieChart() {
    const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
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
        this.balance = response; // Store the fetched balance
      },
      error => {
        console.error('Error fetching balance', error);
      }
    );
  }
}