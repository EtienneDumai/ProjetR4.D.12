import { inject, Injectable } from '@angular/core';
import { Reservation } from '../../models/reservation.model';
import { Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JeuVideo } from '../../models/jeu-video.model';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly http : HttpClient = inject(HttpClient);
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>('http://localhost:3000/Reservation');
  }
  getreservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`http://localhost:3000/Reservation/${id}`);
  }
  addNewReservation(nouvReservation: Reservation): Observable<Reservation> {
    console.log('Je vais ajouter la reservation dans le tableau de reservations');
    return this.getReservations().pipe(
      switchMap((reservations) => {
        let maxId = 0;
        reservations.forEach((r) => {
          if (r.idReservation > maxId) {
            maxId = r.idReservation;
          }
        });
        
        nouvReservation.idReservation = maxId + 1;
        return this.http.post<Reservation>('http://localhost:3000/Reservation', nouvReservation);
      })
    );
  }
  replaceReservation(reservationModified: Reservation): Observable<Reservation> { 
    return this.http.put<Reservation>(`http://localhost:3000/Reservation/${reservationModified.idReservation}`, reservationModified);
  }
  getJeuxVideo(): Observable<JeuVideo[]> {
    return this.http.get<JeuVideo[]>('http://localhost:3000/Jeux');
  }
  getJeuVideoById(id: number): Observable<JeuVideo> {
    return this.http.get<JeuVideo>(`http://localhost:3000/Jeux/${id}`);
  }
  getJeuVideoTitreById(id: number): Observable<string> {
    return this.getJeuVideoById(id).pipe(
      switchMap((jeu) => {
        return of(jeu.titre);
      })
    );
  }
  getJeuVideoPlateformeById(id: number): Observable<string> {
    return this.getJeuVideoById(id).pipe(
      switchMap((jeu) => {
        return of(jeu.plateforme);
      })
    );
  }
}
