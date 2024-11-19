import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent {
 
  @ViewChild('container') container !: ElementRef ;
  @ViewChild('container2') container2 !: ElementRef ;
 
  ngAfterViewInit() {  
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
  "width": 700,
  "height": 400,
  "currencies": [
    "EUR",
    "USD",
    "JPY",
    "GBP",
    "CHF",
    "AUD",
    "CAD",
    "NZD"
  ],
  "isTransparent": false,
  "colorTheme": "light",
  "locale": "en",
  "backgroundColor": "#ffffff"
} 
    
    `;
      this.container.nativeElement.appendChild(script);
    
      const script2= document.createElement("script");
      script2.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js";
      script2.type = "text/javascript";
      script2.async = true;
      script2.innerHTML = `
            {
            "width": 700,
            "height": 400,
            "currencies": [
              "EUR",
              "USD",
              "JPY",
              "GBP",
              "CHF",
              "AUD",
              "CAD",
              "NZD",
              "CNY"
            ],
            "isTransparent": false,
            "colorTheme": "light",
            "locale": "en",
            "backgroundColor": "#ffffff"
          }
                
      `;
  this.container2.nativeElement.appendChild(script2);
}
  
  
}

