import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-medico',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-medico.html',
  styleUrls: ['./home-medico.css']
})
export class HomeMedicoComponent {

  medicoNome = 'João';

  pacientes = [
    { nome: 'Maria Silva', status: 'ok' },
    { nome: 'José Santos', status: 'atencao' },
    { nome: 'Ana Souza', status: 'critico' }
  ];

  medicamentos = [
    { nome: 'Donepezila', paciente: 'Maria Silva' },
    { nome: 'Memantina', paciente: 'José Santos' }
  ];

  consultas = [
    { paciente: 'Maria Silva', data: 'Hoje 09:00' },
    { paciente: 'Ana Souza', data: 'Hoje 14:30' }
  ];

  observacoes = [
    { paciente: 'José Santos', texto: 'Apresentou confusão leve.' },
    { paciente: 'Maria Silva', texto: 'Boa resposta ao tratamento.' }
  ];

  alertas = [
    { mensagem: 'Paciente Ana não tomou medicação' },
    { mensagem: 'Consulta atrasada - José' }
  ];

  get totalOk() {
    return this.pacientes.filter(p => p.status === 'ok').length;
  }

  get totalAtencao() {
    return this.pacientes.filter(p => p.status === 'atencao').length;
  }

  get totalCritico() {
    return this.pacientes.filter(p => p.status === 'critico').length;
  }

}