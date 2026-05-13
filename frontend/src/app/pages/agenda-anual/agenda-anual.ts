import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-agenda-anual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agenda-anual.html',
  styleUrls: ['./agenda-anual.css']
})
export class AgendaAnual {

  constructor(
    private router: Router
  ) {}

  ano = 2026;

  mesAtual = 0;

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

  gerarDias(quantidade: number): number[] {

    return Array.from(
      { length: quantidade },
      (_, i) => i + 1
    );
  }

  proximoMes() {

    if (this.mesAtual < 11) {

      this.mesAtual++;

    } else {

      this.mesAtual = 0;

      this.ano++;
    }
  }

  mesAnterior() {

    if (this.mesAtual > 0) {

      this.mesAtual--;

    } else {

      this.mesAtual = 11;

      this.ano--;
    }
  }

  voltar() {

    this.router.navigate(['/home-paciente']);
  }

}