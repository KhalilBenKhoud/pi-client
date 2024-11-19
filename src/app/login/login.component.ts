import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { animations } from '../utils/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers :  [MessageService],
  animations: animations
 
})
export class LoginComponent {
   username : string = '';
   password : string = '' ;

   @ViewChild('usernameField') usernameField !: ElementRef;
   @ViewChild('passwordField') passwordField !: ElementRef;

   
 
   constructor(private auth : AuthService, private router: Router, private messageService : MessageService ) {}
  
   showError(error : string) {
    this.messageService.add({ severity: 'error', summary: 'Warning', detail: error });
   }
   


   onSubmit() {
     if(this.username == '') { this.usernameField.nativeElement.focus() ; return ; }
     if(this.password == '') {this.passwordField.nativeElement.focus() ; return ; }
      this.auth.login({username : this.username, password : this.password}).subscribe(
      (data :any) => { console.log(data) ;
      localStorage.setItem('accessToken', data.access_token);   localStorage.setItem('loggedIn', 'yes');
      this.auth.isLoggedOut = false ;
      this.router.navigate(['/trading']);
     
      },
      error => {this.showError("invalid credentials")}
     )
   }
}
