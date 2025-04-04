import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AjouterReservationComponent } from './pages/reservation/ajouter-reservation/ajouter-reservation.component';
import { PageReservationsComponent } from './pages/reservation/page-reservations/page-reservations.component';
import { ModifierReservationComponent } from './pages/reservation/modifier-reservation/modifier-reservation.component';
import { PageJeuxComponent } from './pages/jeux/page-jeux/page-jeux.component';
import { AjouterJeuxComponent } from './pages/jeux/ajouter-jeux/ajouter-jeux.component';
import { ModifierJeuComponent } from './pages/jeux/modifier-jeu/modifier-jeu.component';

export const routes: Routes = [
  { path: '', component: PageReservationsComponent }, // Accueil par défaut
  { path: 'liste-reservations', component: PageReservationsComponent },
  { path: 'ajouter-reservation', component: AjouterReservationComponent },
  { path: 'liste-reservation/edit/:id', component: ModifierReservationComponent },
  { path: 'page-jeux', component: PageJeuxComponent },
  { path: 'page-jeux/edit/:id', component: ModifierJeuComponent },
  { path: 'ajouter-jeux', component: AjouterJeuxComponent }
];

export const appRoutingProviders = [
  provideRouter(routes) // Active le routage
];