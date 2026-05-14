import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paciente-agenda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paciente-agenda.html'
})
export class PacienteAgenda implements OnInit {

  tarefas: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {

    console.log('PACIENTE INICIADO');

    setInterval(() => {

      const raw = localStorage.getItem('agenda');
      const dados = raw ? JSON.parse(raw) : [];

      this.tarefas = [...dados];

      console.log('LISTA:', this.tarefas);

      // 🔥 FORÇA atualização da tela
      this.cdr.detectChanges();

    }, 1000);

  }

}