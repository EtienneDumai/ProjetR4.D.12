import { Component, inject } from '@angular/core';
import { JeuVideo } from '../../../models/jeu-video.model';
import { HttpService } from '../../../services/http.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajouter-jeux',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ajouter-jeux.component.html',
  styleUrl: './ajouter-jeux.component.css'
})
export class AjouterJeuxComponent {
  listeJeux: JeuVideo[] = [];
  private readonly httpService: HttpService = inject(HttpService);
  private readonly router: Router = inject(Router);
  public formJeu: FormGroup = new FormGroup({
    titre: new FormControl('', [Validators.required]),
    plateforme: new FormControl('', [Validators.required, Validators.email]),
    genre: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    developpeur: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    dateDeSortie: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    this.httpService.getJeuxVideo().subscribe((jeux: JeuVideo[]) => {
      this.listeJeux = jeux;
      console.log('Liste des jeux:', this.listeJeux);
    });
  }
}