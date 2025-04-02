import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../composants/header/header.component';
import { HttpService } from '../../../services/http.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { JeuVideo } from '../../../models/jeu-video.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { Reservation } from '../../../models/reservation.model';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule, Routes } from '@angular/router';
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
  private readonly httpService: HttpService = inject(HttpService);
  private readonly router: Router = inject(Router);
  public formReservation: FormGroup = new FormGroup({
    nomClient: new FormControl('', [Validators.required]),
    emailClient: new FormControl('', [Validators.required, Validators.email]),
    numTelephoneClient: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    idJeuReserve: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    plateforme: new FormControl('', [Validators.required, Validators.minLength(3)]),
    dateDeReservation: new FormControl('', [Validators.required]),
    statutReservation: new FormControl('', [Validators.required]),

  });
  currentReservation!: Reservation;
  listeJeux: JeuVideo[] = [];
  listeReservations: Reservation[] = [];
  maxIdReservation: number = 0;
  ngOnInit(): void {
    this.httpService.getJeuxVideo().subscribe((jeux: JeuVideo[]) => {
      this.listeJeux = jeux;
      console.log('Liste des jeux:', this.listeJeux);
    });
    this.httpService.getReservations().subscribe((reservations: Reservation[]) => {
      this.listeReservations = reservations;
      console.log('Liste des reservations:', this.listeReservations);
    });
  }
  onSubmit() {
    console.log('je vais créer une nouvelle reservation');
    let idJeuReserve = this.formReservation.value.idJeuReserve;
    console.log('Je vais chrchezr l\id du jeu reserve');
    let jeuVideo: JeuVideo | undefined  = this.listeJeux.find((jeu) => jeu.id === idJeuReserve);
    console.log('je vais chercher l\'id de reservation le plus haut');
    //Recuperer l'id le plus elevé de toutes les reservations existantes
    this.listeReservations.forEach((reservation) => {
      if (reservation.id > this.maxIdReservation) {
        this.maxIdReservation = Number(reservation.id);
      }
    });
    this.maxIdReservation+=1;
    console.log('id le plus haut:', this.maxIdReservation);
    console.log('je vais créer une nouvelle reservation (l\'objet)');
    let newReservation: Reservation = {
      id: this.maxIdReservation ,
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

    this.httpService.addNewReservation(newReservation).subscribe( {
      next: (reservation) => { 
        console.log('Reservation ajoutée:', reservation);
        this.router.navigateByUrl('');
      },
      error: (err) => { console.error(err); }
    });
    console.log('Reservation added:', newReservation);
    console.log('Voici le nouveaux tableau de reservations:', this.listeReservations);
  }
}
