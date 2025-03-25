export class Reservation {
    idReservation: number;
    nomClient: string;
    emailClient: string;
    numTelephoneClient: number;
    idJeuReserve: number;
    titreJeuReserve: string;
    platefrome: string;
    dateDeReservation: Date;
    statutReservation: string;
    constructor(leIdReservation:number, leNomClient: string, leEmailClient: string, leNumTelephoneClient: number, leIdJeuReserve:number, leTitreJeuReserve: string, laPlateforme: string, laDateDeReservation: Date, leStatutReservation: string) {
        this.idReservation = leIdReservation;
        this.nomClient = leNomClient;
        this.emailClient = leEmailClient;
        this.numTelephoneClient = leNumTelephoneClient;
        this.idJeuReserve = leIdJeuReserve;
        this.titreJeuReserve = leTitreJeuReserve;
        this.platefrome = laPlateforme;
        this.dateDeReservation = laDateDeReservation;
        this.statutReservation = leStatutReservation;
    }
}
