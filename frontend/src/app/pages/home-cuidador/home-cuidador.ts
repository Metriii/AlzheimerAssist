import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-cuidador',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home-cuidador.html',
  styleUrl: './home-cuidador.css',
})

export class HomeCuidador {

  medicacoes: any[] = [];

  mostrarModalMedicacao = false;

  nomeMedicacao = '';

  horarioMedicacao = '';

  medicacaoTomada = false;

  editandoIndex: number | null = null;

  ngOnInit(): void {

    this.carregarMedicacoes();

  }

  private getChaveMedicacoes(): string {

    return 'medicacoesPaciente';

  }

  carregarMedicacoes() {

    this.medicacoes = JSON.parse(
      localStorage.getItem(
        this.getChaveMedicacoes()
      ) || '[]'
    );

  }

  salvarListaMedicacoes() {

    localStorage.setItem(
      this.getChaveMedicacoes(),
      JSON.stringify(this.medicacoes)
    );

  }

  abrirModalMedicacao() {

    this.editandoIndex = null;

    this.mostrarModalMedicacao = true;

    this.nomeMedicacao = '';

    this.horarioMedicacao = '';

    this.medicacaoTomada = false;

  }

  fecharModalMedicacao() {

    this.mostrarModalMedicacao = false;

    this.nomeMedicacao = '';

    this.horarioMedicacao = '';

    this.medicacaoTomada = false;

    this.editandoIndex = null;

  }

  salvarMedicacao() {

    if (
      this.nomeMedicacao.trim() === '' ||
      this.horarioMedicacao.trim() === ''
    ) {

      alert('Preencha o nome e o horário.');

      return;

    }

    if (this.editandoIndex !== null) {

      this.medicacoes[this.editandoIndex].nome =
        this.nomeMedicacao;

      this.medicacoes[this.editandoIndex].horario =
        this.horarioMedicacao;

      this.medicacoes[this.editandoIndex].tomado =
        this.medicacaoTomada;

    } else {

      this.medicacoes.push({
        nome: this.nomeMedicacao,
        horario: this.horarioMedicacao,
        tomado: false
      });

    }

    this.salvarListaMedicacoes();

    this.fecharModalMedicacao();

  }

  editarMedicacao(index: number) {

    const medicacao =
      this.medicacoes[index];

    this.editandoIndex = index;

    this.nomeMedicacao =
      medicacao.nome;

    this.horarioMedicacao =
      medicacao.horario;

    this.medicacaoTomada =
      medicacao.tomado;

    this.mostrarModalMedicacao = true;

  }

  removerMedicacao(index: number) {

    this.medicacoes.splice(index, 1);

    this.salvarListaMedicacoes();

  }

}