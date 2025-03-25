export class JeuVideo {
    id:number;
    titre: string;
    plateforme: string;
    genre: string;
    developpeur: string;
    dateSortie: Date;
    stock: number;
    constructor(leId: number, leTitre: string, laPlateforme: string, leGenre: string, leDeveloppeur: string, laDateSortie: Date, leStock: number) {
        this.id = leId;
        this.titre = leTitre;
        this.plateforme = laPlateforme;
        this.genre = leGenre;
        this.developpeur = leDeveloppeur;
        this.dateSortie = laDateSortie;
        this.stock = leStock;
        
    }
}