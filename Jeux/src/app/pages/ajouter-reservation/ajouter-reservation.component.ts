import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../composants/header/header.component';
import { ReservationService } from '../../services/reservation/reservation.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { JeuVideoService } from '../../services/jeu-video/jeu-video.service';
import { JeuVideo } from '../../models/jeu-video.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { Reservation } from '../../models/reservation.model';
@Component({
  selector: 'app-ajouter-reservation',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule],
  providers: [
    provideNativeDateAdapter(), 
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' } 
  ],
  templateUrl: './ajouter-reservation.component.html',
  styleUrl: './ajouter-reservation.component.css'
})
export class AjouterReservationComponent implements OnInit {
  private readonly reservationService: ReservationService = inject(ReservationService);
  private readonly jeuVideoService: JeuVideoService = inject(JeuVideoService);
  public formReservation: FormGroup = new FormGroup({
    nomClient: new FormControl('', [Validators.required]),
    emailClient: new FormControl('', [Validators.required]),
    numTelephoneClient: new FormControl('', [Validators.required]),
    idJeuReserve: new FormControl('', [Validators.required]),
    plateforme: new FormControl('', [Validators.required]),
    dateDeReservation: new FormControl('', [Validators.required]),
    statutReservation: new FormControl('', [Validators.required]),

  });
  currentReservation!: Reservation;
  listeJeux: JeuVideo[] = [];
  listeReservations: Reservation[] = [];
  maxIdReservation: number = 0;
  ngOnInit(): void {
    this.jeuVideoService.getJeuxVideo().subscribe((jeux: JeuVideo[]) => {
      this.listeJeux = jeux;
    });
    this.reservationService.getReservations().subscribe((reservations: Reservation[]) => {
      this.listeReservations = reservations;
    });
    //Recuperer l'id le plus elevé de toutes les reservations existantes
    this.listeReservations.forEach((reservation) => {
      if (reservation.idReservation > this.maxIdReservation) {
        this.maxIdReservation = reservation.idReservation;
      }});
  }
  selectedNumPilote: number = 0;
  onOptionChangeNumPilote(event: any) {
    //Récupérer la valeur sélectionnée du numéro de pilote
    this.selectedNumPilote = Number(event.target.value);
    //Afficher la valeur sélectionnée du numéro de pilote dans la console pour verifier que tout se passe bien
    console.log('voici le jeu' + this.selectedNumPilote);
  }
  onSubmit() {
    
    const reservationFormValues = this.formReservation.value;
  this.jeuVideoService.getJeuVideoById(reservationFormValues.idJeuReserve)
    .subscribe(jeuVideo => {
      this.currentReservation = {
        idReservation: this.maxIdReservation + 1,
        nomClient: reservationFormValues.nomClient,
        emailClient: reservationFormValues.emailClient,
        numTelephoneClient: reservationFormValues.numTelephoneClient,
        idJeuReserve: reservationFormValues.idJeuReserve,
        plateforme: jeuVideo.plateforme,
        titreJeuReserve: jeuVideo.titre,
        dateDeReservation: reservationFormValues.dateDeReservation,
        statutReservation: reservationFormValues.statutReservation
      };

      // Possibly add code here to send currentReservation to your backend
      console.log('Reservation created:', this.currentReservation);
      this.reservationService.addReservation(this.currentReservation);
    });
  }

}
