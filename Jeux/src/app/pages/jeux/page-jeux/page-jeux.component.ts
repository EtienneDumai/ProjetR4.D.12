import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { JeuVideo } from '../../../models/jeu-video.model';
import { MatTableModule } from '@angular/material/table';
import { HttpService } from '../../../services/http.service';
import { FormsModule } from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-page-jeux',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatInputModule, MatRadioModule, MatSidenavModule, MatIconModule, MatButtonModule, MatListModule, MatGridListModule, MatTableModule, MatCardModule, FormsModule, MatLabel, MatFormField],
  templateUrl: './page-jeux.component.html',
  styleUrl: './page-jeux.component.css'
})
export class PageJeuxComponent implements OnInit {
  private readonly httpService: HttpService = inject(HttpService);
  listJeux!: JeuVideo[];
  filtrerJeux!: JeuVideo[];
  searchText: string = '';
  selectedPlatform: string = '';
  listePlateforme = ['PC', 'PS4', 'PS5', 'XBOX ONE', 'XBOX SERIES X', 'SWITCH', 'NINTENDO DS'];
  ngOnInit() {
    this.httpService.getJeuxVideo().subscribe(jeux => { this.listJeux = jeux });
    this.httpService.getJeuxVideo().subscribe(jeux => { this.filtrerJeux = jeux });
    console.log('Liste des jeux:', this.listJeux);

  }
  onSearchChange(): void {
    this.filtrerJeux = this.listJeux.filter(item => {
      // Filtrage par nom (insensible à la casse)
      const matchesName = !this.searchText || item.titre.toLowerCase().includes(this.searchText.toLowerCase());
      // Filtrage par plateforme : si aucune plateforme n'est sélectionnée, afficher tous les items
      const matchesPlatform = !this.selectedPlatform || item.plateforme === this.selectedPlatform;
      return matchesName && matchesPlatform;
    });
  }
  deleteJeu(id: string) {
    this.httpService.onDeleteJeu(id).subscribe(success => {
      if (success) {
        this.listJeux = this.listJeux.filter(jeu => jeu.id !== id);
      }
    });
  }
  addJeu() {
    this.httpService.addJeu();
  }
  editJeu(id: string) {
    this.httpService.editJeu(id);
  }
}
