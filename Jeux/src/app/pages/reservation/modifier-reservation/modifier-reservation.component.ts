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
import { Router, RouterModule, Routes, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-modifier-reservation',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
  templateUrl: './modifier-reservation.component.html',
  styleUrl: './modifier-reservation.component.css'
})
export class ModifierReservationComponent implements OnInit {
  private readonly httpService: HttpService = inject(HttpService);
  private readonly router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
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
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.httpService.getreservationById(+id).subscribe(reservation => {
        this.formReservation.patchValue(reservation);
      });
    }
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.httpService.updateReservation(id, this.formReservation.value).subscribe(() => {
        console.log("Réservation mise à jour !");
        // redirection par exemple :
        this.router.navigateByUrl('');
      });
    }
  }
}

