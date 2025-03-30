import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../composants/header/header.component';
import { ReservationService } from '../../services/reservation/reservation.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { JeuVideo } from '../../models/jeu-video.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { Reservation } from '../../models/reservation.model';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-ajouter-reservation',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
  templateUrl: './ajouter-reservation.component.html',
  styleUrl: './ajouter-reservation.component.css'
})
export class AjouterReservationComponent implements OnInit {
  private readonly reservationService: ReservationService = inject(ReservationService);
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
    this.reservationService.getJeuxVideo().subscribe((jeux: JeuVideo[]) => {
      this.listeJeux = jeux;
    });
    this.reservationService.getReservations().subscribe((reservations: Reservation[]) => {
      this.listeReservations = reservations;
    });
  }
  onSubmit() {
    console.log('je vais créer une nouvelle reservation');
    let idJeuReserve = this.formReservation.value.idJeuReserve;
    let jeuVideo: JeuVideo | undefined;
    console.log('Je vais chrchezr l\id du jeu reserve');
    this.reservationService.getJeuVideoById(idJeuReserve).subscribe((jeu: JeuVideo) => {
      jeuVideo = jeu;
    });
    console.log('Jeu trouvé:', jeuVideo);
    console.log('je vais chercher l\'id de reservation le plus haut');
    //Recuperer l'id le plus elevé de toutes les reservations existantes
    this.listeReservations.forEach((reservation) => {
      if (reservation.idReservation > this.maxIdReservation) {
        this.maxIdReservation = reservation.idReservation;
      }
    });
    console.log('id le plus haut:', this.maxIdReservation);
    console.log('je vais créer une nouvelle reservation (l\'objet)');
    let newReservation: Reservation = {
      idReservation: this.maxIdReservation + 1,
      nomClient: this.formReservation.value.nomClient,
      emailClient: this.formReservation.value.emailClient,
      numTelephoneClient: this.formReservation.value.numTelephoneClient,
      idJeuReserve: this.formReservation.value.idJeuReserve,
      titreJeuReserve: jeuVideo?.titre ?? '',
      plateforme: jeuVideo?.plateforme ?? '',
      dateDeReservation: this.formReservation.value.dateDeReservation,
      statutReservation: this.formReservation.value.statutReservation
    };
    console.log('Nouvelle reservation:', newReservation);

    this.reservationService.addReservation(newReservation);
    console.log('Reservation added:', newReservation);
    console.log('Voici le nouveaux tableau de reservations:', this.listeReservations);
  }
}
