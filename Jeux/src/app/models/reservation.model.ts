export class Reservation {
    id: string;
    nomClient: string;
    emailClient: string;
    numTelephoneClient: string;
    idJeuReserve: string;
    titreJeuReserve: string;
    plateforme: string;
    dateDeReservation: Date;
    statutReservation: string;
    constructor(leIdReservation:string, leNomClient: string, leEmailClient: string, leNumTelephoneClient: string, leIdJeuReserve:string, leTitreJeuReserve: string, laPlateforme: string, laDateDeReservation: Date, leStatutReservation: string) {
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
