import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-agenda-anual',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './agenda-anual.html',
  styleUrls: ['./agenda-anual.css']
})

export class AgendaAnual {

  ano = 2026;

  mesAtual = 0;

  diaSelecionado: number | null = null;

  tituloEvento = '';

  descricaoEvento = '';

  eventos: any[] = [];

  meses = [
    { nome: 'Janeiro', dias: 31 },
    { nome: 'Fevereiro', dias: 28 },
    { nome: 'Março', dias: 31 },
    { nome: 'Abril', dias: 30 },
    { nome: 'Maio', dias: 31 },
    { nome: 'Junho', dias: 30 },
    { nome: 'Julho', dias: 31 },
    { nome: 'Agosto', dias: 31 },
    { nome: 'Setembro', dias: 30 },
    { nome: 'Outubro', dias: 31 },
    { nome: 'Novembro', dias: 30 },
    { nome: 'Dezembro', dias: 31 }
  ];

  constructor(
    private router: Router
  ) {
    this.carregarEventos();
  }

  private getChaveEventos(): string {

    const usuarioLogado = JSON.parse(
      localStorage.getItem('usuarioLogado') || 'null'
    );

    if (
      !usuarioLogado ||
      !usuarioLogado.email ||
      !usuarioLogado.cpf
    ) {
      return 'eventosAgendaAnual_semUsuario';
    }

    const emailLimpo = usuarioLogado.email
      .trim()
      .toLowerCase();

    const cpfLimpo = usuarioLogado.cpf
      .replace(/\D/g, '');

    return `eventosAgendaAnual_${emailLimpo}_${cpfLimpo}`;
  }

  gerarDias(): (number | null)[] {

    const primeiroDiaSemana = new Date(
      this.ano,
      this.mesAtual,
      1
    ).getDay();

    const quantidadeDias =
      this.meses[this.mesAtual].dias;

    const dias: (number | null)[] = [];

    for (let i = 0; i < primeiroDiaSemana; i++) {
      dias.push(null);
    }

    for (
      let dia = 1;
      dia <= quantidadeDias;
      dia++
    ) {
      dias.push(dia);
    }

    return dias;
  }

  abrirCaixa(dia: number) {
    this.diaSelecionado = dia;
    this.tituloEvento = '';
    this.descricaoEvento = '';
  }

  fecharCaixa() {
    this.diaSelecionado = null;
    this.tituloEvento = '';
    this.descricaoEvento = '';
  }

  salvarEvento() {

    if (this.diaSelecionado === null) {
      return;
    }

    if (this.tituloEvento.trim() === '') {
      return;
    }

    const chave = this.criarChave(
      this.diaSelecionado
    );

    this.eventos.push({
      chave,
      dia: this.diaSelecionado,
      mes: this.mesAtual,
      ano: this.ano,
      titulo: this.tituloEvento,
      descricao: this.descricaoEvento
    });

    localStorage.setItem(
      this.getChaveEventos(),
      JSON.stringify(this.eventos)
    );

    this.tituloEvento = '';
    this.descricaoEvento = '';
  }

  buscarEventos(dia: number) {

    if (dia === null) {
      return [];
    }

    const chave = this.criarChave(dia);

    return this.eventos.filter(
      e => e.chave === chave
    );
  }

  apagarEvento(
    chave: string,
    indexDoDia: number
  ) {

    const eventosDoDia =
      this.eventos.filter(
        e => e.chave === chave
      );

    const eventoParaApagar =
      eventosDoDia[indexDoDia];

    this.eventos =
      this.eventos.filter(
        e => e !== eventoParaApagar
      );

    localStorage.setItem(
      this.getChaveEventos(),
      JSON.stringify(this.eventos)
    );
  }

  criarChave(dia: number): string {
    return `${this.ano}-${this.mesAtual + 1}-${dia}`;
  }

  carregarEventos() {
    this.eventos = JSON.parse(
      localStorage.getItem(
        this.getChaveEventos()
      ) || '[]'
    );
  }

  proximoMes() {

    if (this.mesAtual < 11) {
      this.mesAtual++;
    } else {
      this.mesAtual = 0;
      this.ano++;
    }

    this.fecharCaixa();
  }

  mesAnterior() {

    if (this.mesAtual > 0) {
      this.mesAtual--;
    } else {
      this.mesAtual = 11;
      this.ano--;
    }

    this.fecharCaixa();
  }

  voltar() {
    this.router.navigate([
      '/home-paciente'
    ]);
  }
}