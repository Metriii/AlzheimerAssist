import { Component } from '@angular/core';

@Component({
  selector: 'app-home-paciente',
  imports: [],
  templateUrl: './home-paciente.html',
  styleUrl: './home-paciente.css',
})
export class HomePacienteComponent {

  dataAtual: string = '';

  ngOnInit(): void {

    const hoje = new Date();

    this.dataAtual = hoje.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });

  }

}
