import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private http : HttpClient) { }

  askQuestion(question : string, oldConversation : any[]) {
     return this.http.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${environment.GEMINI_API_KEY}`,
      {"contents":[
        ...oldConversation,
       {"role": "user","parts":[{"text": question}]}]
   }
,   
{
   headers : {
   'Content-Type' : 'application/json',
  
}

} 
     )
  }



}
