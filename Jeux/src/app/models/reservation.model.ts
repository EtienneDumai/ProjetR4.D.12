export class Reservation {
    nomClient: string;
    emailClient: string;
    numTelephoneClient: number;
    titreJeuReserve: string;
    platefrome: string;
    dateDeReservation: Date;
    statutReservation: string;
    constructor(leNomClient: string, leEmailClient: string, leNumTelephoneClient: number, leTitreJeuReserve: string, laPlateforme: string, laDateDeReservation: Date, leStatutReservation: string) {
        this.nomClient = leNomClient;
        this.emailClient = leEmailClient;
        this.numTelephoneClient = leNumTelephoneClient;
        this.titreJeuReserve = leTitreJeuReserve;
        this.platefrome = laPlateforme;
        this.dateDeReservation = laDateDeReservation;
        this.statutReservation = leStatutReservation;
    }
}
