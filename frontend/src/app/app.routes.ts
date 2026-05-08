import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { HomeComponent } from './pages/home/home';
import { HomeMedicoComponent } from './pages/home-medico/home-medico';
import { HomeCuidador } from './pages/home-cuidador/home-cuidador';
import { HomePacienteComponent } from './pages/home-paciente/home-paciente';
import { VincularPaciente } from './pages/vincular-paciente/vincular-paciente';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'home', component: HomeComponent },

  // 👇 ADICIONA ISSO
  { path: 'home-medico', component: HomeMedicoComponent },
  { path:'home-cuidador', component : HomeCuidador},
  { path:'vincular-paciente', component : VincularPaciente},
  {
  path: 'home-paciente',
  component: HomePacienteComponent
}
];