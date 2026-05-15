import {Component, OnInit, ChangeDetectorRef} from '@angular/core';

import {CommonModule} from '@angular/common';

import {AgendaService} from '../../services/agenda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente-agenda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paciente-agenda.html',
  styleUrl: './paciente-agenda.css'
})
export class PacienteAgenda
implements OnInit {

  tarefas: any[] = [];

  constructor(
    private agenda: AgendaService,
    private cdr: ChangeDetectorRef,
      private router: Router

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

    console.log(
      'PACIENTE:',
      this.tarefas
    );

  }

  toggle(index: number) {

    this.agenda.toggleFeito(index);

    this.load();

  }
  voltar() {

    this.router.navigate([
      '/home-paciente'
    ]);

  }

}