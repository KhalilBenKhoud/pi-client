import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  @ViewChild('container') container !: ElementRef ;
  @ViewChild('container2') container2 !: ElementRef ;


  ngAfterViewInit() {  const script = document.createElement("script");
  script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
  script.type = "text/javascript";
  script.async = true;
  script.innerHTML = `
   {
    "feedMode": "all_symbols",
    "isTransparent": false,
    "displayMode": "regular",
    "width": 400,
    "height": 550,
    "colorTheme": "light",
    "locale": "en"
  } 
  `;
    this.container.nativeElement.appendChild(script);
    
    const script2 = document.createElement("script");
    script2.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script2.type = "text/javascript";
    script2.async = true;
    script2.innerHTML = `
     {
    "colorTheme": "light",
    "isTransparent": false,
    "width": "400",
    "height": "550",
    "locale": "en",
    "importanceFilter": "-1,0,1",
    "countryFilter": "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu"
  }
    `;
      this.container2.nativeElement.appendChild(script2);
  

  }

}
