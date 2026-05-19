import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { AgendaService } from '../../services/agenda.service';

@Component({
  selector: 'app-home-cuidador',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './home-cuidador.html',
  styleUrl: './home-cuidador.css',
})

export class HomeCuidador {

  medicacoes: any[] = [];

  atividades: any[] = [];

  alertasPaciente: string[] = [];

  mesAtual = '';

  diaAtual: number = new Date().getDate();

  diasDoMes: number[] = [];

  mostrarModalMedicacao = false;

  nomeMedicacao = '';

  horarioMedicacao = '';

  medicacaoTomada = false;

  editandoIndex: number | null = null;

  emailPaciente = '';

  pacienteVinculado: any = null;

  erroVinculo = '';

  emailDestino = '';

  observacaoPaciente = '';

  constructor(
    private agenda: AgendaService
  ) {}

  ngOnInit(): void {

    this.carregarPacienteVinculado();

    this.carregarMedicacoes();

    this.carregarAtividades();

    this.gerarAlertas();

    this.carregarMiniCalendario();

    setInterval(() => {

      this.carregarAtividades();

      this.carregarMedicacoes();

      this.gerarAlertas();

    }, 500);

  }

  carregarPacienteVinculado() {

    const pacienteSalvo = localStorage.getItem(
      'pacienteVinculado'
    );

    if (pacienteSalvo) {

      this.pacienteVinculado =
        JSON.parse(pacienteSalvo);

    }

  }

  vincularPaciente() {

    this.erroVinculo = '';

    if (this.emailPaciente.trim() === '') {

      this.erroVinculo =
        'Digite o e-mail do paciente.';

      return;
    }

    const usuarios = JSON.parse(
      localStorage.getItem(
        'usuariosCadastrados'
      ) || '[]'
    );

    const pacienteExiste = usuarios.find(
      (usuario: any) =>

        usuario.email === this.emailPaciente &&

        usuario.tipo === 'paciente'
    );

    if (!pacienteExiste) {

      this.pacienteVinculado = null;

      this.erroVinculo =
        'Paciente não encontrado.';

      return;
    }

    this.pacienteVinculado =
      pacienteExiste;

    localStorage.setItem(
      'pacienteVinculado',
      JSON.stringify(pacienteExiste)
    );

    this.emailPaciente = '';

    this.carregarMedicacoes();

    this.carregarAtividades();

    this.gerarAlertas();

  }

  removerVinculoPaciente() {

    this.pacienteVinculado = null;

    this.medicacoes = [];

    this.atividades = [];

    this.alertasPaciente = [];

    localStorage.removeItem(
      'pacienteVinculado'
    );

  }

  enviarObservacaoEmail() {

    if (
      this.emailDestino.trim() === '' ||
      this.observacaoPaciente.trim() === ''
    ) {
      alert(
        'Preencha o e-mail e a observação.'
      );

      return;
    }

    const assunto =
      `Observação do paciente ${this.pacienteVinculado?.nome || ''}`;

    const mensagem =
      `
Paciente:
${this.pacienteVinculado?.nome || ''}

Observação:
${this.observacaoPaciente}
`;

    const link =
      `mailto:${this.emailDestino}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(mensagem)}`;

    window.location.href = link;

    this.emailDestino = '';

    this.observacaoPaciente = '';

  }

  gerarAlertas() {

    this.alertasPaciente = [];

    if (!this.pacienteVinculado) {
      return;
    }

    this.medicacoes.forEach((medicacao: any) => {

      if (!medicacao.tomado) {

        this.alertasPaciente.push(
          `Medicação ${medicacao.nome} às ${medicacao.horario} pendente`
        );

      }

    });

    if (this.atividades.length === 0) {

      this.alertasPaciente.push(
        'Exercício cognitivo não realizado'
      );

    }

  }

  private getChaveMedicacoes(): string {

    if (!this.pacienteVinculado) {
      return 'medicacoesPaciente';
    }

    return `medicacoesPaciente-${this.pacienteVinculado.email}`;

  }

  carregarMedicacoes() {

    this.medicacoes = JSON.parse(
      localStorage.getItem(
        this.getChaveMedicacoes()
      ) || '[]'
    );

  }

  salvarListaMedicacoes() {

    if (!this.pacienteVinculado) {

      alert(
        'Vincule um paciente antes.'
      );

      return;
    }

    localStorage.setItem(
      this.getChaveMedicacoes(),
      JSON.stringify(this.medicacoes)
    );

    this.gerarAlertas();

  }

  abrirModalMedicacao() {

    if (!this.pacienteVinculado) {

      alert(
        'Vincule um paciente primeiro.'
      );

      return;
    }

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

    if (!this.pacienteVinculado) {

      alert(
        'Vincule um paciente antes.'
      );

      return;
    }

    if (
      this.nomeMedicacao.trim() === '' ||
      this.horarioMedicacao.trim() === ''
    ) {

      alert(
        'Preencha o nome e o horário.'
      );

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

    if (!this.pacienteVinculado) {

      alert(
        'Vincule um paciente primeiro.'
      );

      return;
    }

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

    if (!this.pacienteVinculado) {

      alert(
        'Vincule um paciente primeiro.'
      );

      return;
    }

    this.medicacoes.splice(index, 1);

    this.salvarListaMedicacoes();

    this.gerarAlertas();

  }

  carregarAtividades() {

    if (!this.pacienteVinculado) {

      this.atividades = [];

      return;
    }

    this.atividades =
      this.agenda.loadPorPaciente(
        this.pacienteVinculado.email
      );

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

}