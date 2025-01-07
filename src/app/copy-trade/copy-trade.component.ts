import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-copy-trade',
  templateUrl: './copy-trade.component.html',
  styleUrls: ['./copy-trade.component.css']
})
export class CopyTradeComponent implements OnInit {
  users: any[] = [];
  isLoading = false;
  errorMessage = '';
  followerId = 1; // Simule l'ID de l'utilisateur actuel, remplacez par l'ID réel après authentification

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  // Charge les utilisateurs pour le copy trade
  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur de récupération.';
        this.isLoading = false;
      },
    });
  }

  // Suivre un trader
  follow(traderId: number, percentageToInvest: number) {
    this.userService.followTrader(traderId, percentageToInvest).subscribe({
      next: (response) => {
        alert(response.message);
      },
      error: (error) => alert(error.error.detail)
    });
  }
  // Arrêter de suivre un trader
  unfollow(traderId: number) {
    this.userService.unfollowTrader(traderId, this.followerId).subscribe({
      next: (response) => {
        alert(response.message);
        this.loadUsers(); // Mettre à jour la liste après l'action
      },
      error: (error) => alert(error.error.detail)
    });
  }

  // Détermine si un utilisateur est suivi
  isFollowing(user: any): boolean {
    return user.isFollowing;
  }
}
