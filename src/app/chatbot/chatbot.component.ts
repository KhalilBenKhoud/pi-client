import { Component } from '@angular/core';
import { ChatbotService } from '../services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  messages : any[] = [];
  conversation : any[] = [] ;
  chatbotShown : boolean = false ;
  
  constructor(private chatbotService : ChatbotService) {}

  sendMessage(event: any) {
    const question = {
      type : 'text',
      text : event.message,
      date : new Date(),
      user: {
        name: 'You'
      },
    }
    this.messages = [...this.messages,question];
    this.conversation = [...this.conversation, {"role": "user","parts":[{"text": event.message}]}] ;
    this.chatbotService.askQuestion(event.message,this.conversation).subscribe(
      (data : any) => {
        const replyText = data.candidates[0].content.parts[0].text ;
        const reply = {
          type : 'text',
          reply: true ,
          text : replyText,
          date : new Date(),
          user: {
            name: 'Chatbot'
          },
        }
        this.messages.push(reply) ;
        this.conversation = [...this.conversation, {"role": "model","parts":[{"text": replyText}]}]
        console.log(replyText)
      },
      (error : any) => console.error(error) 
      
    )

  }

  toggleChatbot() {
    this.chatbotShown = !this.chatbotShown ;
  }

  resetHistory() {
    this.messages = [] ;
    this.conversation = [] ;
  }
}
