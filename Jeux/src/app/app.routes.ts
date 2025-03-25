import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { AjouterReservationComponent } from './pages/ajouter-reservation/ajouter-reservation.component';
import { PageReservationsComponent } from './pages/page-reservations/page-reservations.component';

export const routes: Routes = [
  { path: '', component: PageReservationsComponent }, // Accueil par défaut
  { path: 'liste-reservations', component: PageReservationsComponent }, // 👈 Ajout explicite d’Accueil
  { path: 'ajouter-reservation', component: AjouterReservationComponent } // Page Classement
];

export const appRoutingProviders = [
  provideRouter(routes) // Active le routage
];