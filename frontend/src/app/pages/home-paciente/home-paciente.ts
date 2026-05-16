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

  nome: string = '';

  dataAtual: string = '';

  tarefas: any[] = [];

  agendaAnual: any[] = [];

  mesAtual: string = '';

  diaAtual: number = new Date().getDate();

  diasDoMes: number[] = [];

  constructor(
    private router: Router,
    private agenda: AgendaService
  ) {}

  ngOnInit(): void {

    const usuarioSalvo =
      localStorage.getItem(
        'usuarioCadastrado'
      );

    if (usuarioSalvo) {

      const usuario =
        JSON.parse(usuarioSalvo);

      this.nome = usuario.nome;
    }

    const hoje = new Date();

    this.dataAtual =
      hoje.toLocaleDateString(
        'pt-BR',
        {
          weekday: 'long',
          day: 'numeric',
          month: 'long'
        }
      );

    this.carregarMiniCalendario();

    this.load();

    setInterval(() => {

      this.load();

    }, 500);
  }

  carregarMiniCalendario(): void {

    const hoje = new Date();

    const nomesMeses = [
      'JANEIRO',
      'FEVEREIRO',
      'MARÇO',
      'ABRIL',
      'MAIO',
      'JUNHO',
      'JULHO',
      'AGOSTO',
      'SETEMBRO',
      'OUTUBRO',
      'NOVEMBRO',
      'DEZEMBRO'
    ];

    const mes =
      hoje.getMonth();

    const ano =
      hoje.getFullYear();

    this.mesAtual =
      nomesMeses[mes];

    const totalDias =
      new Date(
        ano,
        mes + 1,
        0
      ).getDate();

    this.diasDoMes =
      Array.from(
        { length: totalDias },
        (_, i) => i + 1
      );
  }

  load() {

    this.tarefas =
      this.agenda.load();

    this.agendaAnual =
      JSON.parse(
        localStorage.getItem(
          'agendaAnual'
        ) || '[]'
      );
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