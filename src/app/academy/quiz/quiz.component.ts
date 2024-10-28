import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
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
    @Input() correctAnswer !: string ;
    @Input() choices !: string[] ;
    @ViewChildren('options') options !: QueryList<ElementRef> ;

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
          else this.showWarn('Wrong! try again !')
    }

    showCorrectAnswer() {
       let correct = this.options.find((e : ElementRef) => e.nativeElement.innerText.trim() === this.correctAnswer)
       if(correct)  {
        correct.nativeElement.style.color = 'green' ;
        correct.nativeElement.style.fontWeight = 1000 ;
       }
      
    }
}
