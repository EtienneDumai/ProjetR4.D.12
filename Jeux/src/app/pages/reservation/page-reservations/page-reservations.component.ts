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
@Component({
  selector: 'app-page-reservations',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule, MatListModule, MatGridListModule, MatTableModule, MatCardModule],
  templateUrl: './page-reservations.component.html',
  styleUrl: './page-reservations.component.css'
})
export class PageReservationsComponent implements OnInit {
  private readonly httpService: HttpService = inject(HttpService);
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);
  listReservations!: Reservation[];
  ngOnInit() {
    this.httpService.getReservations().subscribe(reservations => { this.listReservations = reservations });
  }
  deleteReservation(id: string) {
    this.httpService.onDeleteReservation(id);
  }
  addReservation() {
    this.httpService.addReservation();
  }
  editReservation(id: string) {
    this.httpService.editReservation(id);
  }
}
