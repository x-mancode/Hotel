
export default interface IHotelsData {
    hotels:     Hotel[];
    rooms:     HotelRoom[];
}

export interface Hotel {
    id:              string;
    name:            string;
    address1:        string;
    address2:        string;
    images:          Image[];
    starRating:      number;
}

export interface Image {
    url: string;
}

export interface HotelRoom {
    id: string;
    rooms:     Room[];
}


export interface Room {
    id:               string;
    name:             string;
    longDescription:  string;
    occupancy:        Occupancy;
}

export interface Occupancy {
    maxAdults:   number;
    maxChildren: number;
    maxOverall:  number;
}
