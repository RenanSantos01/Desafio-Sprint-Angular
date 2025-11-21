import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    this.loginService.authenticate(this.username, this.password).subscribe({
      next: (success) => {
        if (success) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', this.username);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Usuário ou senha incorretos!';
        }
      },
      error: () => {
        this.errorMessage = 'Erro ao conectar ao servidor.';
      }
    });
  }
}
