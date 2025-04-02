import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReservationService } from '../../services/reservation/reservation.service';
import { MatCardModule } from '@angular/material/card';
import { Reservation } from '../../models/reservation.model';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { AjouterReservationComponent } from "../ajouter-reservation/ajouter-reservation.component";
@Component({
  selector: 'app-page-reservations',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule, MatListModule, MatGridListModule, MatTableModule, MatCardModule],
  templateUrl: './page-reservations.component.html',
  styleUrl: './page-reservations.component.css'
})
export class PageReservationsComponent implements OnInit {
  private readonly reservationService: ReservationService = inject(ReservationService);
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);
  listReservations!: Reservation[];
  displayedColumns: string[] = ['id', 'nomClient', 'emailClient', 'numTelephoneClient', 'titreJeuReserve', 'plateforme', 'dateDeReservation', 'statutReservation', 'actions'];
  ngOnInit() {
    this.reservationService.getReservations().subscribe(reservations => { this.listReservations = reservations });
  }
  deleteReservation(id: number) {
    this.reservationService.onDeleteReservation(id);
  }
  addReservation() {
    this.reservationService.addReservation();
  }
  editReservation(id: number) {
    this.reservationService.editReservation(id);
  }
}
