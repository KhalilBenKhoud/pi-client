import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  @Input() notificationsVisible !: boolean ;

  notifications = [
    { title: 'New Lesson Added', content: 'Check out the latest lesson on trading fundamentals.' },
    { title: 'Quiz Reminder', content: 'You have a quiz due in 2 days.' },
    { title: 'New Message', content: 'Your instructor has sent you a new message.' },
    { title: 'Assignment Feedback', content: 'Your recent assignment has been reviewed.' }
  ];

 

}
