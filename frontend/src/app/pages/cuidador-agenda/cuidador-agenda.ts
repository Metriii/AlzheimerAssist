import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgendaService } from '../../services/agenda.service';

@Component({
  selector: 'app-cuidador-agenda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cuidador-agenda.html'
})
export class CuidadorAgenda implements OnInit {

  titulo = '';
  horario = '';

  tarefas: any[] = [];

  constructor(private agenda: AgendaService) {}

  ngOnInit() {
    this.atualizar();
  }

  enviar() {

    console.log('CUIDADOR -> enviar');

    this.agenda.salvar(this.titulo, this.horario);

    this.titulo = '';
    this.horario = '';

    this.atualizar();
  }

  excluir(index: number) {

    console.log('CUIDADOR -> excluir', index);

    this.agenda.excluir(index);

    this.atualizar();
  }

  atualizar() {
    this.tarefas =
      JSON.parse(localStorage.getItem('agenda') || '[]');
  }

}