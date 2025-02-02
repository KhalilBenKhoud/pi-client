import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   headers = new HttpHeaders({
    'Content-Type': 'application/json'   
  });

   

  constructor(private http : HttpClient) { }
  
   isLoggedOut :boolean = true ;
  
   isAuthenticated() {
    return !!localStorage.getItem('accessToken') && !!localStorage.getItem('loggedIn') ;
  }

  login(requestBody : {username : string , password : string}) {
    return this.http.post(`${environment.BaseApiUrl}/auth/login`,requestBody,{ headers : this.headers , withCredentials: true  })
  }
  register(requestBody :any) {
    return this.http.post(`${environment.BaseApiUrl}/auth/register`,requestBody,{ headers : this.headers , withCredentials: true  })
  }

  refreshToken() {
    return this.http.post(`${environment.BaseApiUrl}/auth/refresh_token`,{},{ headers : this.headers , withCredentials: true  })
  }

  logout() {
    
    return this.http.post(`${environment.BaseApiUrl}/auth/logout`,{},{ headers : this.headers , withCredentials: true  }) 
  }


}
