import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AgendaService } from '../../services/agenda.service';

@Component({
  selector: 'app-cuidador-agenda',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cuidador-agenda.html',
  styleUrl: './cuidador-agenda.css'
})

export class CuidadorAgenda implements OnInit {

  titulo = '';

  horario = '';

  tarefas: any[] = [];

  constructor(
    private agenda: AgendaService,
    private router: Router
  ) {}

  ngOnInit() {

    this.load();

  }

  load() {

    this.tarefas =
      this.agenda.load();

  }

  adicionar() {

    if (
      this.titulo.trim() === '' ||
      this.horario.trim() === ''
    ) {
      alert('Preencha o título e o horário.');
      return;
    }

    this.agenda.salvar(
      this.titulo,
      this.horario
    );

    this.titulo = '';

    this.horario = '';

    this.load();

  }

  excluir(index: number) {

    this.agenda.excluir(index);

    this.load();

  }

  toggle(index: number) {

    this.agenda.toggleFeito(index);

    this.load();

  }

  voltar() {

    this.router.navigate([
      '/home-cuidador'
    ]);

  }

}