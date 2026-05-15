import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { AgendaService } from '../../services/agenda.service';

@Component({
  selector: 'app-home-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-paciente.html',
  styleUrl: './home-paciente.css',
})

export class HomePacienteComponent {

  dataAtual: string = '';

  tarefas: any[] = [];

  constructor(
    private router: Router,
    private agenda: AgendaService
  ) {}

  ngOnInit(): void {

    const hoje = new Date();

    this.dataAtual = hoje.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });

    // 🔥 carregar tarefas
    this.load();

    // 🔥 atualizar automático
    setInterval(() => {

      this.load();

    }, 500);

  }

  // 🔥 carregar lista
  load() {

    this.tarefas =
      this.agenda.load();

  }

  irParaAtividade() {

    this.router.navigate([
      '/atividade-memoria'
    ]);

  }

  irParaAgendaAnual() {

    this.router.navigate([
      '/agenda-anual'
    ]);

  }

  abrirAgenda() {

    this.router.navigate([
      '/paciente-agenda'
    ]);

  }

}