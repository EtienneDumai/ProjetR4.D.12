import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../composants/header/header.component';
import { ReservationService } from '../../services/reservation/reservation.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ajouter-reservation',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './ajouter-reservation.component.html',
  styleUrl: './ajouter-reservation.component.css'
})
export class AjouterReservationComponent {
  private readonly reservationService: ReservationService = inject(ReservationService);
  public formReservation: FormGroup = new FormGroup({
    nomClient: new FormControl('', [Validators.required]),
    emailClient: new FormControl('', [Validators.required]),
    numTelephoneClient: new FormControl('', [Validators.required]),
    idJeuReserve: new FormControl('', [Validators.required]),
    plateforme: new FormControl('', [Validators.required]),
    dateDeReservation: new FormControl('', [Validators.required]),
    statutReservation: new FormControl('', [Validators.required])
  });
}
