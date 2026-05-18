import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { AgendaService } from '../../services/agenda.service';

import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-paciente-agenda',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './paciente-agenda.html',
  styleUrl: './paciente-agenda.css'
})

export class PacienteAgenda implements OnInit {

  tarefas: any[] = [];

  constructor(
    private agenda: AgendaService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {

    this.load();

    setInterval(() => {

      this.load();

      this.cdr.detectChanges();

    }, 500);

  }

  load() {

    const lista =
      this.agenda.load();

    this.tarefas = [
      ...lista
    ];

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