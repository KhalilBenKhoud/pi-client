import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  @Input() notificationsVisible!: boolean;

  notifications: any[] = []; // Initialisez avec un tableau vide pour recevoir les données de l'API

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationService.getallnotification().subscribe(
      (data: any) => {
        this.notifications = data; // Met à jour la variable avec les notifications de l'API
      },
      (error) => {
        console.error('Erreur lors du chargement des notifications:', error);
      }
    );
  }
}
