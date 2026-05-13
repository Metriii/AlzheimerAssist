import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaService, Tarefa } from '../../services/agenda';

@Component({
  selector: 'app-paciente-agenda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paciente-agenda.html'
})
export class PacienteAgenda {

  constructor(public agendaService: AgendaService) {}

  get tarefas(): Tarefa[] {
    return this.agendaService.listar();
  }
}