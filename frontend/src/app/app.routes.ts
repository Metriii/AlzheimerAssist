import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { HomeComponent } from './pages/home/home';
import { HomeMedicoComponent } from './pages/home-medico/home-medico';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'home', component: HomeComponent },

  // 👇 ADICIONA ISSO
  { path: 'home-medico', component: HomeMedicoComponent },
];