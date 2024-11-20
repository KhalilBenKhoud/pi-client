import { Component } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { MessageService } from 'primeng/api';
import { NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [MessageService]
})
export class NotesComponent {
  noteContent !: string ; 
  notes !: any[] ;
  accents : NbComponentStatus[] = ['basic','danger','primary','control','info','warning','success'] ;

  constructor(private messageService: MessageService, private noteService : NotesService) {}

  getRandomAccent()  {
     return  this.accents[Math.floor(Math.random() * this.accents.length)] as NbComponentStatus ;
  }

  showInfo(message :string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
}

showError(message :string) {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
}

onSave() {
     this.noteService.addNote({content : this.noteContent}).subscribe(() => {
        this.showInfo('note added');
        this.fetchNotes() ;
     },
    error => this.showError("note already exists or server problem !"))
    
  }

 fetchNotes() {
    this.noteService.getAllNotes().subscribe((data : any) => {
         this.notes = [...data]
         console.log(this.notes) ;
    },
    error => console.error(error))
  }

  ngOnInit() {
     this.fetchNotes() ;
  }
}
