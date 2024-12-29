import { Component } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { MessageService, TreeDragDropService } from 'primeng/api';
import { NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [MessageService,TreeDragDropService]
})
export class NotesComponent {
  noteContent !: string ; 
  notes !: any[] ;
  accents : NbComponentStatus[] = ['basic','danger','primary','control','info','warning','success'] ;

  draggedNote !: any ;
  selectedNotes : any = JSON.parse(localStorage.getItem('importantNotes') || '[]').sort((a: any,b : any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) ;

  dragStart(note :any) {
    this.draggedNote = note ;
    console.log(this.draggedNote) ;
  }

  drop() {
    console.log(this.draggedNote)

    if (this.draggedNote) {
        let draggedNoteIndex = this.notes.findIndex(  (n: any) => n.id === this.draggedNote.id);
        this.selectedNotes = [...(this.selectedNotes as any[]), this.draggedNote].sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        this.notes = this.notes?.filter((val, i) => i != draggedNoteIndex);
        this.draggedNote = null;
    }
    localStorage.setItem('importantNotes',JSON.stringify(this.selectedNotes)) ;
}

dragEnd() {
    this.draggedNote = null;
}



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
        this.noteContent = '' ;
     },
    error => this.showError("note already exists or server problem !"))
    
  }

 fetchNotes() {
    this.noteService.getAllNotes().subscribe((data : any) => {
         this.notes = [...data].sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
         this.notes = this.notes.filter(e => !this.selectedNotes.find((s : any) => s.id === e.id)) ;
    },
    error => console.error(error))
  }

  ngOnInit() {
     this.fetchNotes() ;
  }
}
