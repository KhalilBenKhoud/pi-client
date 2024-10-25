import { Component ,HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor( public authService : AuthService, private router: Router) {}
  isScrolled !: Boolean ;
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Get the scroll position
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Toggle the class based on the scroll position
    if (scrollPosition > 100) { // Adjust the threshold value as needed
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  logout() {
    this.authService.logout().subscribe(
      (data : any) => { localStorage.removeItem('accessToken') ; localStorage.removeItem('loggedIn') ;
      this.router.navigate(["/home"])},
      error => {  console.log(error) ;}
    )
  }

  
}
