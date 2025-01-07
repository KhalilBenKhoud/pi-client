import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-monte-carlo-streamlit',
  templateUrl: './monte-carlo-streamlit.component.html',
  styleUrls: ['./monte-carlo-streamlit.component.css']
})
export class MonteCarloStreamlitComponent {
  @Input() streamlitUrl: string = "https://finrisk.streamlit.app/";
}
