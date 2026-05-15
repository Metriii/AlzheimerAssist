import {Component, OnInit, ChangeDetectorRef} from '@angular/core';

import { CommonModule} from '@angular/common';

import { FormsModule} from '@angular/forms';

import { AgendaService} from '../../services/agenda.service';

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
export class CuidadorAgenda
implements OnInit {

  titulo = '';
  horario = '';

  tarefas: any[] = [];

  constructor(
    private agenda: AgendaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    // 🔥 carregar inicial
    this.load();

    // 🔥 sincronização automática
    setInterval(() => {

      this.load();

      // 🔥 força atualizar HTML
      this.cdr.detectChanges();

    }, 500);

  }

  load() {

    const lista =
      this.agenda.load();

    this.tarefas = [...lista];

  }

  enviar() {

    this.agenda.salvar(
      this.titulo,
      this.horario
    );

    this.load();

    this.titulo = '';
    this.horario = '';
  }

  excluir(index: number) {

    this.agenda.excluir(index);

    this.load();

  }

  toggle(index: number) {

    this.agenda.toggleFeito(index);

    this.load();

  }

}