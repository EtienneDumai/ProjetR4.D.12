export class Reservation {
    id: number;
    nomClient: string;
    emailClient: string;
    numTelephoneClient: number;
    idJeuReserve: number;
    titreJeuReserve: string;
    plateforme: string;
    dateDeReservation: Date;
    statutReservation: string;
    constructor(leIdReservation:number, leNomClient: string, leEmailClient: string, leNumTelephoneClient: number, leIdJeuReserve:number, leTitreJeuReserve: string, laPlateforme: string, laDateDeReservation: Date, leStatutReservation: string) {
        this.id = leIdReservation;
        this.nomClient = leNomClient;
        this.emailClient = leEmailClient;
        this.numTelephoneClient = leNumTelephoneClient;
        this.idJeuReserve = leIdJeuReserve;
        this.titreJeuReserve = leTitreJeuReserve;
        this.plateforme = laPlateforme;
        this.dateDeReservation = laDateDeReservation;
        this.statutReservation = leStatutReservation;
    }
}
