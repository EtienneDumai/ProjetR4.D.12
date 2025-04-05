import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpService } from '../../../services/http.service';
import { MatCardModule } from '@angular/material/card';
import { Reservation } from '../../../models/reservation.model';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { AjouterReservationComponent } from "../ajouter-reservation/ajouter-reservation.component";
import { MatLabel } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-page-reservations',
  standalone: true,
  imports: [CommonModule, MatToolbarModule,MatRadioModule, MatInputModule,FormsModule, MatFormField, MatLabel, MatSidenavModule, MatIconModule, MatButtonModule, MatListModule, MatGridListModule, MatTableModule, MatCardModule],
  templateUrl: './page-reservations.component.html',
  styleUrl: './page-reservations.component.css'
})
export class PageReservationsComponent implements OnInit {
  private readonly httpService: HttpService = inject(HttpService);
  private readonly router: Router = inject(Router);
  listReservations!: Reservation[];
  searchText: string = '';
  selectedStatut: string = '';
  filtrerReservations!: Reservation[];
  listeStatut = ['En attente', 'Confirmée', 'Annulée'];
  ngOnInit() {
    this.httpService.getReservations().subscribe(reservations => { this.listReservations = reservations });
    this.httpService.getReservations().subscribe(reservations => { this.filtrerReservations = reservations });
  }
  onSearchChange(): void {
    this.filtrerReservations = this.listReservations.filter(item => {
      // Filtrage par nom (insensible à la casse)
      const matchesName = !this.searchText || item.nomClient.toLowerCase().includes(this.searchText.toLowerCase());
      // Filtrage par plateforme : si aucune plateforme n'est sélectionnée, afficher tous les items
      const matchesStatut = !this.selectedStatut || item.statutReservation === this.selectedStatut;
      return matchesName && matchesStatut;
    });
  }
  deleteReservation(id: string) {
    this.httpService.onDeleteReservation(id).subscribe(success => {
      if (success) {
        this.listReservations = this.listReservations.filter(reservation => reservation.id !== id);
      }
    });
    
  }
  addReservation() {
    this.httpService.addReservation();
  }
  editReservation(id: string) {
    this.httpService.editReservation(id);
  }
}
