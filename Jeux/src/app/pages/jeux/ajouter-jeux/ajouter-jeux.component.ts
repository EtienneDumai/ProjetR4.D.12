import { Component, inject } from '@angular/core';
import { JeuVideo } from '../../../models/jeu-video.model';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-ajouter-jeux',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
  templateUrl: './ajouter-jeux.component.html',
  styleUrl: './ajouter-jeux.component.css'
})
export class AjouterJeuxComponent {
  listePlateforme: string[] = [];
  listeJeux: JeuVideo[] = [];
  listeGenre: string[] = [];
  thumbRegex!: RegExp;
  private readonly httpService: HttpService = inject(HttpService);
  private readonly router: Router = inject(Router);
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
    console.log('J\'entre dans le onSubmit()');
    let dernierIdJeux: number = 0;
    this.listeJeux.map((jeu) => {
      if (Number(jeu.id) > dernierIdJeux) {
        dernierIdJeux = Number(jeu.id);
      }
    });
    this.maxIdJeux = dernierIdJeux + 1;
    console.log('Id du dernier jeu:', dernierIdJeux, 'Id du nouveau jeu:', this.maxIdJeux);
    let newJeux: JeuVideo = {
      id: this.maxIdJeux.toString(),
      titre: this.formJeu.value.titre,
      plateforme: this.formJeu.value.plateforme,
      genre: this.formJeu.value.genre,
      developpeur: this.formJeu.value.developpeur,
      dateSortie: this.formJeu.value.dateDeSortie,
      stock: this.formJeu.value.stock,
      imageUrl: this.formJeu.value.imageUrl,
    }
    console.log('Nouveau jeu : ', newJeux);
    this.httpService.addNewJeu(newJeux).subscribe({
      next: (jeu) => {
        console.log('Jeu ajouté avec succès:', jeu);
        this.router.navigateByUrl('page-jeux');
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du jeu:', error);
      }
    });
  }
}