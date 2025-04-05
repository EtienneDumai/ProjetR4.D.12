import { Component, inject } from '@angular/core';
import { JeuVideo } from '../../../models/jeu-video.model';
import { HttpService } from '../../../services/http.service';
import { Router, RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-modifier-jeu',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
  templateUrl: './modifier-jeu.component.html',
  styleUrl: './modifier-jeu.component.css'
})
export class ModifierJeuComponent {
  listePlateforme: string[] = [];
  listeJeux: JeuVideo[] = [];
  listeGenre: string[] = [];
  thumbRegex!: RegExp;
  private readonly httpService: HttpService = inject(HttpService);
  private readonly router: Router = inject(Router);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  maxIdJeux: number = 0;
  public formJeu: FormGroup = new FormGroup({
    titre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    plateforme: new FormControl('', [Validators.required, Validators.email]),
    genre: new FormControl('', [Validators.required]),
    developpeur: new FormControl('', [Validators.required]),
    dateDeSortie: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required, Validators.pattern(this.thumbRegex)]),
  });
  ngOnInit(): void {
    this.httpService.getJeuxVideo().subscribe((jeux: JeuVideo[]) => {
      this.listeJeux = jeux;
      console.log('Liste des jeux:', this.listeJeux);
    });
    this.thumbRegex = new RegExp(
      'https?:\\/\\/.*\\.(?:png|jpg|jpeg|gif|svg|webp)$'
    );
    this.listePlateforme = ['PC', 'PS4', 'PS5', 'XBOX ONE', 'XBOX SERIES X', 'SWITCH', 'NINTENDO DS'];
    this.listeGenre = ['Action', 'Aventure', 'RPG', 'FPS', 'Simulation', 'Stratégie', 'Sport', 'Course'];
  }
  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.httpService.updateJeu(id, this.formJeu.value).subscribe(() => {
        console.log("Réservation mise à jour !");
        this.router.navigateByUrl('page-jeux');
      });
    }
  }
}
