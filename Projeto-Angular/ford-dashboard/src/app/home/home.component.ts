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
  username: string = localStorage.getItem('username') || 'Usuário';
  menuOpen: boolean = false;

  constructor(private router: Router) {}

  // 🔹 Abre ou fecha o menu lateral
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // 🔹 Vai para o Dashboard
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  // 🔹 Faz logout corretamente
  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    sessionStorage.clear();

    this.router.navigate(['/login']);
  }
}
