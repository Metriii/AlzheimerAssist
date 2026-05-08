import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule // 🔥 necessário pro routerLink funcionar
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  
  
})
export class RegisterComponent {

  tipo = '';
  nome = '';
  email = '';
  senha = '';
  cpf = '';
  crm = '';
  especialidade = '';

  camposInvalidos: string[] = [];

  constructor(private router: Router) {}

  cadastrar() {

    this.camposInvalidos = [];

    if (!this.tipo) this.camposInvalidos.push('tipo');
    if (!this.nome) this.camposInvalidos.push('nome');
    if (!this.email) this.camposInvalidos.push('email');
    if (!this.senha) this.camposInvalidos.push('senha');

    if (this.tipo === 'cuidador' && !this.cpf) {
      this.camposInvalidos.push('cpf');
    }

    if (this.tipo === 'medico') {
      if (!this.crm) this.camposInvalidos.push('crm');
      if (!this.especialidade) this.camposInvalidos.push('especialidade');
    }

    // ❌ se tiver erro → não continua
    if (this.camposInvalidos.length > 0) return;

    // ✅ sucesso → volta pro login
    this.router.navigate(['/']);
  }

  campoInvalido(campo: string): boolean {
    return this.camposInvalidos.includes(campo);
  }
}