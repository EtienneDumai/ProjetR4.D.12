import { Injectable } from '@angular/core';
import { JeuVideo } from '../../models/jeu-video.model';
@Injectable({
  providedIn: 'root'
})
export class JeuVideoService {
  constructor() { }
  getJeuxVideo(): JeuVideo[] {
    return [
      {
        id: 1,
        titre: "War Thunder",
        plateforme: "PC",
        genre: "Simulation",
        developpeur: "Gaijin Entertainment",
        dateSortie: new Date("2012-12-21"),
        stock: 10
      },
      {
        id: 2,
        titre: "Dora sauve la princesse des neiges",
        plateforme: "Nintendo DS",
        genre: "Aventure",
        developpeur: "2K Play",
        dateSortie: new Date("2009-01-30"),
        stock: 25
      },
      {
        id: 3,
        titre: "Super Mario Pyrénnées Atlantiques",
        plateforme: "Nintendo 64",
        genre: "Plateforme",
        developpeur: "Nintendo",
        dateSortie: new Date("1996-06-23"),
        stock: 5
      }
    ]
  }
  getJeuVideoById(id: number): JeuVideo {
    const JeuVideo = this.getJeuxVideo().find((jeu) => jeu.id === id);
    if (JeuVideo) {
      return JeuVideo;
    } else {
      throw new Error('Game not found');
    }
  }
}
