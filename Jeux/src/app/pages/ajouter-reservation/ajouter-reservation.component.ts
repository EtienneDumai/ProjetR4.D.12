import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../composants/header/header.component';
import { ReservationService } from '../../services/reservation/reservation.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { JeuVideoService } from '../../services/jeu-video/jeu-video.service';
import { JeuVideo } from '../../models/jeu-video.model';

@Component({
  selector: 'app-ajouter-reservation',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
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
  listeJeux: JeuVideo[] = [];
  ngOnInit(): void {
    this.jeuVideoService.getJeuxVideo().subscribe((jeux: JeuVideo[]) => {
      this.listeJeux = jeux;
    });
  }
  selectedNumPilote: number = 0;
  onOptionChangeNumPilote(event: any) {
    //Récupérer la valeur sélectionnée du numéro de pilote
    this.selectedNumPilote = Number(event.target.value);
    //Afficher la valeur sélectionnée du numéro de pilote dans la console pour verifier que tout se passe bien
    console.log('voici le jeu' + this.selectedNumPilote);
  }
}
