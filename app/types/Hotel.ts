interface HotelLocation {
    address: string;
    city: string;
    latitute: string;
    longitude: string;
}

interface HotelCheckIn {
    from: string;
    to: string;
}

interface HotelCheckOut {
    from: string;
    to: string;
}

interface HotelContact {
    phoneNumber: string;
    email: string;
}

export interface Hotel {
    id: number;
    name: string;
    location: HotelLocation;
    stars: number;
    checkIn: HotelCheckIn;
    checkOut: HotelCheckOut;
    contact: HotelContact;
    gallery: string[];
    userRating: number;
    price: number;
    currency: string;
}
