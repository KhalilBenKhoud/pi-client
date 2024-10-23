import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [MessageService]
})
export class QuizComponent {
    @Input() question: string ="" ;
    userAnswer !: string ;
    correctAnswer : string = 'Onion';

    constructor(private messageService: MessageService) {}

    showSuccess(message : string) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
  showWarn(message : string) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: message });
}
    submitAnswer() {
          if(this.userAnswer === this.correctAnswer)
            this.showSuccess('great ! correct answer !')
    }
}
