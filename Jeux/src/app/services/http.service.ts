import { inject, Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
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
    let idJeuReserve = data.idJeuReserve;
    console.log(data);
    return this.getJeuVideoTitreById(idJeuReserve).pipe(
      switchMap((titre: string) => {
        console.log('Titre du jeu réservé:', titre);
        data.titreJeuReserve = titre;
        return this.http.put<Reservation>(`http://localhost:3000/Reservation/${id}`, data);
      })
    );
  }
  onDeleteReservation(idReservation: string): Observable<boolean> {
    // On effectue une requête HTTP DELETE à l'URL spécifiée pour supprimer le jeu correspondant.
    return this.http.delete(`http://localhost:3000/Reservation/${idReservation}`).pipe(
      // 'tap' permet d'exécuter une action secondaire (ici, l'affichage d'un message dans la console)
      // sans modifier la valeur émise par l'observable.
      tap(() => console.log("Supprimé avec succès")),
      // 'mapTo' transforme toute valeur émise en 'true', indiquant que la suppression a réussi.
      map(() =>true),
      // 'catchError' intercepte toute erreur survenue lors de la requête HTTP.
      // En cas d'erreur, on affiche un message d'erreur dans la console et on renvoie un observable émettant 'false'.
      catchError(err => {
        console.error("Erreur lors de la suppression :", err);
        return of(false);
      })
    );
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
  onDeleteJeu(idJeu: string): Observable<boolean> {
    // On effectue une requête HTTP DELETE à l'URL spécifiée pour supprimer le jeu correspondant.
    return this.http.delete(`http://localhost:3000/Jeux/${idJeu}`).pipe(
      // 'tap' permet d'exécuter une action secondaire (ici, l'affichage d'un message dans la console)
      // sans modifier la valeur émise par l'observable.
      tap(() => console.log("Supprimé avec succès")),
      // 'mapTo' transforme toute valeur émise en 'true', indiquant que la suppression a réussi.
      map(() =>true),
      // 'catchError' intercepte toute erreur survenue lors de la requête HTTP.
      // En cas d'erreur, on affiche un message d'erreur dans la console et on renvoie un observable émettant 'false'.
      catchError(err => {
        console.error("Erreur lors de la suppression :", err);
        return of(false);
      })
    );
  }
  editJeu(id: string) {
    this.router.navigate(['page-jeux/edit', id]);
  }
  addJeu() {
    this.router.navigateByUrl('ajouter-jeux');
  }
  addNewJeu(nouveauJeu: JeuVideo): Observable<JeuVideo> {
    console.log('Je vais ajouter le jeu dans le tableau de jeux');
    return this.http.post<JeuVideo>('http://localhost:3000/Jeux', nouveauJeu);
  }
  updateJeu(id: string, data: any): Observable<JeuVideo> {
    return this.http.put<JeuVideo>(`http://localhost:3000/Jeux/${id}`, data);
  }
}
