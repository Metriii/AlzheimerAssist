import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgendaService } from '../../services/agenda';

@Component({
  selector: 'app-cuidador-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cuidador-agenda.html'
})
export class CuidadorAgenda {

  titulo = '';
  horario = '';

  constructor(public agendaService: AgendaService) {}

  adicionar() {
    if (!this.titulo || !this.horario) return;

    this.agendaService.adicionar(this.titulo, this.horario);

    console.log('👨‍⚕️ CUIDADOR ADICIONOU');
    console.log(this.agendaService.listar());

    this.titulo = '';
    this.horario = '';
  }
}