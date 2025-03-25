import { Injectable } from '@angular/core';
import { Reservation } from '../../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  getReservations(): Reservation[] {
    return [
      {
        idReservation: 1,
        nomClient: "Jean",
        emailClient: "jean.dupont@gmail.com",
        numTelephoneClient: 1234567890,
        idJeuReserve: 2,
        titreJeuReserve: "Dora sauve la princesse des neiges",
        platefrome: "Nintendo DS",
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
        platefrome: "PC",
        dateDeReservation: new Date("2023-04-12"),
        statutReservation: "Confirmée"
      }];
  }
  getreservationById(id: number): Reservation {
    const reservation = this.getReservations().find((reservation) => reservation.idReservation === id);
    if (reservation) {
      return reservation;
    } else {
      throw new Error('Reservation not found');
    }
  }
  constructor() { }
}
