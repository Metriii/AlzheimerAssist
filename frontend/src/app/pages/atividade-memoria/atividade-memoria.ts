import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';

import {
  Router,
  RouterModule
} from '@angular/router';

@Component({
  selector: 'app-atividade-memoria',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './atividade-memoria.html',
  styleUrl: './atividade-memoria.css',
})

export class AtividadeMemoria {

  constructor(
    private router: Router
  ) {}

  voltar() {

    this.router.navigate([
      '/home-paciente'
    ]);

  }

}