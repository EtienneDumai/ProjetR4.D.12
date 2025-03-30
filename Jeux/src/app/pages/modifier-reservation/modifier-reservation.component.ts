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
import { Router, RouterModule, Routes } from '@angular/router';
@Component({
  selector: 'app-modifier-reservation',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './modifier-reservation.component.html',
  styleUrl: './modifier-reservation.component.css'
})
export class ModifierReservationComponent implements OnInit{
  private readonly reservationService: ReservationService = inject(ReservationService);
  private readonly router: Router = inject(Router);
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
      console.log('Liste des jeux:', this.listeJeux);
    });
    this.reservationService.getReservations().subscribe((reservations: Reservation[]) => {
      this.listeReservations = reservations;
      console.log('Liste des reservations:', this.listeReservations);
    });
  }
  onSubmit() {}
}
