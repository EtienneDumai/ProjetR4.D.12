export class JeuVideo {
    titre: string;
    plateforme: string;
    genre: string;
    developpeur: string;
    dateSortie: Date;
    stock: number;
    constructor(leTitre: string, laPlateforme: string, leGenre: string, leDeveloppeur: string, laDateSortie: Date, leStock: number) {
        this.titre = leTitre;
        this.plateforme = laPlateforme;
        this.genre = leGenre;
        this.developpeur = leDeveloppeur;
        this.dateSortie = laDateSortie;
        this.stock = leStock;
        
    }
}