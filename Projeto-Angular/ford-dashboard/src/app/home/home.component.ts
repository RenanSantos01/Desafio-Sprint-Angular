import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username = localStorage.getItem('username') || 'Usuário';
  menuOpen = false;

  constructor(private router: Router) {}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    // 🔹 Limpa dados de login
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    sessionStorage.clear();

    // 🔹 Redireciona para login
    this.router.navigate(['/login']);
  }
}
