export class JeuVideo {
    id:string;
    titre: string;
    plateforme: string;
    genre: string;
    developpeur: string;
    dateSortie: Date;
    stock: string;
    imageUrl: string;
    constructor(leId: string, leTitre: string, laPlateforme: string, leGenre: string, leDeveloppeur: string, laDateSortie: Date, leStock: string, lImageUrl: string) {
        this.id = leId;
        this.titre = leTitre;
        this.plateforme = laPlateforme;
        this.genre = leGenre;
        this.developpeur = leDeveloppeur;
        this.dateSortie = laDateSortie;
        this.stock = leStock;
        this.imageUrl = lImageUrl;
    }
}