import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-paciente',
  imports: [],
  templateUrl: './home-paciente.html',
  styleUrl: './home-paciente.css',
})

export class HomePacienteComponent {

  dataAtual: string = '';

  constructor(private router: Router) {

  }

  ngOnInit(): void {

    const hoje = new Date();

    this.dataAtual = hoje.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });

  }

  irParaAtividade() {

    this.router.navigate(['/atividade-memoria']);

  }

  irParaAgendaAnual(){
    this.router.navigate(['/agenda-anual']);
  }
    abrirAgenda() {
    this.router.navigate(['/agenda-diaria']);
  }

}