import { Injectable } from '@angular/core';
import { Reservation } from '../../models/reservation.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  getReservations(): Observable<Reservation[]> {
    return of ([
      {
        idReservation: 1,
        nomClient: "Jean",
        emailClient: "jean.dupont@gmail.com",
        numTelephoneClient: 1234567890,
        idJeuReserve: 2,
        titreJeuReserve: "Dora sauve la princesse des neiges",
        plateforme: "Nintendo DS",
        dateDeReservation: new Date("2021-03-12"),
        statutReservation: "En attente"
      },
      {
        idReservation: 2,
        nomClient: "Etienne",
        emailClient: "etienne.dumai@gmail.com",
        numTelephoneClient: 7028010140,
        idJeuReserve: 1,
        titreJeuReserve: "War Thunder",
        plateforme: "PC",
        dateDeReservation: new Date("2023-04-12"),
        statutReservation: "Confirmée"
      }]);
  }
  getreservationById(id: number): Observable<Reservation> {
    let reservation: Reservation | undefined;
    this.getReservations().subscribe((reservations) =>{
      reservation = reservations.find(reservation => reservation.idReservation === id);
    } );
    if (reservation) {
      return of(reservation);
    } else {
      throw new Error('Reservation not found');
    }
  }
  addReservation(reservation: Reservation): Observable<Reservation> {
    let reservations: Reservation[] = [];
    this.getReservations().subscribe((reservations) => {
      reservations.push(reservation);
    });
    return of(reservation);
  }
  constructor() { }
}
