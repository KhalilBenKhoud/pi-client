import { Component } from '@angular/core';
//import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { animations } from '../utils/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers :  [MessageService],
  animations: animations
})
export class RegisterComponent {
  username !: string ;
  email !: string ;
  experience !: string ;
  password !: string ;
  repeatPassword !: string ;
  proficiency !: string ;
  stateOptions: any[] = [{ label: 'beginner', value: 'beginner' },{ label: 'intermediate', value: 'intermediate' },{ label: 'advanced', value: 'advanced' }];


//,
 constructor(private auth : AuthService, private router :Router,  private messageService: MessageService) {}

 showWarn(warning : string) {
  this.messageService.add({ severity: 'warn', summary: 'Warning', detail: warning });
 }

 showError(error : string) {
  this.messageService.add({ severity: 'error', summary: 'Warning', detail: error });
 }

showSuccess(message : string) {
this.messageService.add({ severity: 'success', summary: 'Success', detail: message });

}

  onSubmit() {
    if(!this.username || !this.email  || !this.proficiency || !this.password || !this.experience || !this.repeatPassword) {
       this.showWarn("fill all the fields !") ;
       return ;
    }
    if(this.password != this.repeatPassword) { this.showWarn("mismatching passwords !") ; return ; }
    const requestBody = {
     username : this.username,
     email : this.email ,
     proficiency : this.proficiency ,
     experience : this.experience ,
     password : this.password 
    }
    console.log(requestBody)
    this.auth.register(requestBody).subscribe(
      (data : any) => {
        localStorage.setItem('accessToken', data.access_token);   localStorage.setItem('loggedIn', 'yes');
        this.auth.isLoggedOut = false ;
        this.router.navigate(['/trading']);
      },
      error => this.showError("there was a problem signing you up, probably your email is not real")
    )
  }

}
