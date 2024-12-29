import { Component } from '@angular/core';
import { AcademyService } from '../services/academy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { animations } from '../utils/animations';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.css'],
  animations: animations,
  providers: [MessageService]
})
export class AcademyComponent {
    constructor(private messageService: MessageService, private router: Router,private route: ActivatedRoute, private service : AcademyService) {}
    lessons : any[] = []
    lessonId : number = JSON.parse(localStorage.getItem('lastLesson') || "1") ;
   
   
    ngOnInit() {
        this.service.getAllLessons().subscribe((data : any) => {
           this.lessons = [...data] ;
           console.log(this.lessons)
        },
      error => console.log(error))
       
      this.route.paramMap.subscribe(params => {
        this.lessonId = Number.parseInt(params.get('id')  || "")  || this.lessonId ;
        localStorage.setItem("lastLesson",JSON.stringify(this.lessonId)) ;
      })
    }

    showInfo(message :string) {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }

    
  nextLesson() {
    if (this.lessonId < this.lessons.length) {
        this.router.navigate(['/academy', (this.lessonId + 1).toString()])
            .then(() => {
                localStorage.setItem('lastLesson', JSON.stringify(this.lessonId));
            });
    } else {
        this.showInfo('There are no more lessons.');
    }
}

previousLesson() {
    if (this.lessonId > 1) {
        this.router.navigate(['/academy', (this.lessonId - 1).toString()])
            .then(() => {
                localStorage.setItem('lastLesson', JSON.stringify(this.lessonId));
            });
    } else {
        this.showInfo('This is the first lesson.');
    }
}
}
