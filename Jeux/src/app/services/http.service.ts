import { inject, Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JeuVideo } from '../models/jeu-video.model';
import { Router, RouterModule, Routes } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>('http://localhost:3000/Reservation');
  }
  getreservationById(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(`http://localhost:3000/Reservation/${id}`);
  }
  addNewReservation(nouvReservation: Reservation): Observable<Reservation> {
    console.log('Je vais ajouter la reservation dans le tableau de reservations');
    return this.http.post<Reservation>('http://localhost:3000/Reservation', nouvReservation);
  }
  updateReservation(id: string, data: any): Observable<Reservation> {
    return this.http.put<Reservation>(`http://localhost:3000/Reservation/${id}`, data);
  }
  onDeleteReservation(idReservation: string) {
    this.http
      .delete(`http://localhost:3000/Reservation/${idReservation}`)
      .subscribe({
        next: () => {
          console.log("Supprimé avec succès");
        },
        error: (err) => {
          console.error("Erreur lors de la suppression :", err);
        }
      });
    this.router.navigateByUrl('liste-reservations');
  }
  editReservation(id: string) {
    this.router.navigate(['liste-reservation/edit', id]);
  }
  addReservation() {
    this.router.navigateByUrl('ajouter-reservation');
  }
  getJeuxVideo(): Observable<JeuVideo[]> {
    return this.http.get<JeuVideo[]>('http://localhost:3000/Jeux');
  }
  getJeuVideoById(id: string): Observable<JeuVideo> {
    return this.http.get<JeuVideo>(`http://localhost:3000/Jeux/${id}`);
  }
  getJeuVideoTitreById(id: string): Observable<string> {
    return this.getJeuVideoById(id).pipe(
      switchMap((jeu) => {
        return of(jeu.titre);
      })
    );
  }
  getJeuVideoPlateformeById(id: string): Observable<string> {
    return this.getJeuVideoById(id).pipe(
      switchMap((jeu) => {
        return of(jeu.plateforme);
      })
    );
  }
  onDeleteJeu(idJeu: string){
    this.http
      .delete(`http://localhost:3000/Jeux/${idJeu}`)
      .subscribe({
        next: () => {
          console.log("Supprimé avec succès");
        },
        error: (err) => {
          console.error("Erreur lors de la suppression :", err);
        }
      });
    this.router.navigateByUrl('liste-jeux');
  }
  editJeu(id: string) {
    this.router.navigate(['liste-jeux/edit', id]);
  }
  addJeu() {
    this.router.navigateByUrl('ajouter-jeu');
  }
}
