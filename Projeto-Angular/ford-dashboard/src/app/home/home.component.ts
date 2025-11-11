import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  // 🔹 Alterna a abertura e fechamento do menu lateral
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    console.log(`📂 Menu lateral ${this.menuOpen ? 'aberto' : 'fechado'}`);
  }

  // 🔹 Faz logout e redireciona para o login
  logout(): void {
    console.log('🟡 Clique no botão Sair detectado');

    // Fecha o menu lateral
    this.menuOpen = false;

    // Remove dados de login
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    sessionStorage.clear();

    // Exibe uma mensagem opcional
    alert('Você saiu da sua conta.');

    // Redireciona para a tela de login
    this.router.navigate(['/login']).then(() => {
      console.log('✅ Redirecionamento para /login executado');
      // Impede retorno à Home pelo botão voltar
      window.history.pushState(null, '', '/login');
      window.history.replaceState(null, '', '/login');
    });
  }
}
