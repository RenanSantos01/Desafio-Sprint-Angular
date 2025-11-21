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

  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  
  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    sessionStorage.clear();

    this.router.navigate(['/login']);
  }
}
