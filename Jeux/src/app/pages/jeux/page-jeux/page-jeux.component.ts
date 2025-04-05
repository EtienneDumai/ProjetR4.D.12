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
@Component({
  selector: 'app-page-jeux',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule, MatListModule, MatGridListModule, MatTableModule, MatCardModule],
  templateUrl: './page-jeux.component.html',
  styleUrl: './page-jeux.component.css'
})
export class PageJeuxComponent implements OnInit {
  private readonly httpService: HttpService = inject(HttpService);
  listJeux!: JeuVideo[];
  ngOnInit() {
    this.httpService.getJeuxVideo().subscribe(jeux => { this.listJeux = jeux });
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
