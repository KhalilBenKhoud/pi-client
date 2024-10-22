import { Component } from '@angular/core';
import { animations } from '../utils/animations';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: animations
})
export class HomeComponent  {
  OptionsCustom: OwlOptions = {
    items: 2,
    loop: true,
    margin: 30,
    autoWidth: true,
    autoHeight: true,
    stagePadding: 100,
    nav: true,
    center: true
  };

  scrollToBottom(): void {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }
  
}

  

     

