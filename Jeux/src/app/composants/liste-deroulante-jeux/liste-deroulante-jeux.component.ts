import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { JeuVideoService } from '../../services/jeu-video/jeu-video.service';
import { JeuVideo } from '../../models/jeu-video.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-liste-deroulante-jeux',
  standalone: true,
  imports: [MatSelectModule],
  templateUrl: './liste-deroulante-jeux.component.html',
  styleUrl: './liste-deroulante-jeux.component.css'
})
export class ListeDeroulanteJeuxComponent implements OnInit {
  /**
   * Injection de dépendance du service JeuVideoService
   */
  private readonly jeuVideoService: JeuVideoService = inject(JeuVideoService);
  /**
   * PlacheHolder de la liste déroulante
   */
  @Input() placheholder: string = "Séléctionner un jeu";

  /**
   * Liste des jeux
   */
  @Output() listeJeux: JeuVideo[] = [];

  /**
   * Jeu sélectionné
   */
  @Output() jeuSelectionne: string | undefined = undefined;
  /**
   * Emitteur de la valeur vers le compsant parent
   */
  @Output() jeuSelectionneChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.jeuVideoService.getJeuxVideo().subscribe((jeux: JeuVideo[]) => {
      this.listeJeux = jeux;
    });
  }
}
