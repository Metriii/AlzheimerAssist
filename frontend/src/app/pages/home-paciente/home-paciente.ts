import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { AgendaService } from '../../services/agenda.service';

@Component({
  selector: 'app-home-paciente',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './home-paciente.html',
  styleUrl: './home-paciente.css',
})

export class HomePacienteComponent {

  nome: string = '';

  dataAtual: string = '';

  tarefas: any[] = [];

  agendaAnual: any[] = [];

  medicacoes: any[] = [];

  mesAtual: string = '';

  diaAtual: number = new Date().getDate();

  diasDoMes: number[] = [];

  constructor(
    private router: Router,
    private agenda: AgendaService
  ) {}

  ngOnInit(): void {

    this.carregarUsuario();

    this.carregarDataAtual();

    this.carregarMiniCalendario();

    this.load();

    setInterval(() => {

      this.load();

    }, 500);
  }

  carregarUsuario() {

    const usuarioSalvo =
      localStorage.getItem(
        'usuarioLogado'
      );

    if (usuarioSalvo) {

      const usuario =
        JSON.parse(usuarioSalvo);

      this.nome = usuario.nome;

    }

  }

  carregarDataAtual() {

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

  }

  private getChaveMedicacoes(): string {

    return 'medicacoesPaciente';

  }

  carregarMedicacoes() {

    const medicacoesSalvas =
      localStorage.getItem(
        this.getChaveMedicacoes()
      );

    this.medicacoes =
      medicacoesSalvas
        ? JSON.parse(medicacoesSalvas)
        : [];

    console.log(
      'MEDICAÇÕES PACIENTE:',
      this.medicacoes
    );

  }

  salvarMedicacoes() {

    localStorage.setItem(
      this.getChaveMedicacoes(),
      JSON.stringify(this.medicacoes)
    );

  }

  marcarComoTomado(index: number) {

    if (
      this.medicacoes[index] &&
      !this.medicacoes[index].tomado
    ) {

      this.medicacoes[index].tomado = true;

      this.salvarMedicacoes();

    }

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

    this.carregarMedicacoes();

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