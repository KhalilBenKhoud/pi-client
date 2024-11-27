// src/app/components/var-calculator/var-calculator.component.ts

import { Component, AfterViewInit  } from '@angular/core';
import { VarCalculatorService } from '../services/var-calculator.service';
import lottie from 'lottie-web';


@Component({
  selector: 'app-var-calculator',
  templateUrl: './var-calculator.component.html',
  styleUrls: ['./var-calculator.component.css']
})
export class VarCalculatorComponent implements AfterViewInit{
  symbol: string = '';
  confidenceLevel: number = 0.95;
  varResult: any;
  errorMessage: string | null = null;

  constructor(private varCalculatorService: VarCalculatorService) {}

  ngAfterViewInit(): void {
    // Right-Side Animation
    lottie.loadAnimation({
      container: document.getElementById('lottie-animation-right')!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottie.host/embed/884f8db0-0432-4641-a7a0-740572deae6d/OMRGn8MALt.json'
    });

    // Top-Left Blurred Animation
    lottie.loadAnimation({
      container: document.getElementById('lottie-animation-top-left')!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottie.host/38eab8bd-8da7-4cb3-af59-af962220d4d4/RmYmRIKpj6.json'
    });
  }

  calculateVar() {
    this.varCalculatorService.calculateVar(this.symbol, this.confidenceLevel)
      .subscribe({
        next: (result) => {
          this.varResult = result;
          this.errorMessage = null;
        },
        error: (error) => {
          this.errorMessage = 'Error calculating VaR. Please check the symbol and try again.';
          console.error(error);
        }
      });
  }
}
