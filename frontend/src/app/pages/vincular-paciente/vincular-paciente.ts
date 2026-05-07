import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vincular-paciente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vincular-paciente.html',
  styleUrl: './vincular-paciente.css'
})
export class VincularPaciente {

  emailPaciente = '';

  constructor(
    private router: Router
  ) { }

  vincular() {

    /*
      POR ENQUANTO:
      apenas navega
    */

    this.router.navigate([
      '/home-cuidador'
    ]);

  }

}