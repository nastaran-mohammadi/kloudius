export interface Place {
    name: string;
    address: string;
    place_id: string;
    photo?: string | null;
    coords: {
        latitude: number;
        longitude: number;
    };
};

export interface PlaceDetails {
    geometry: { location: { lat: number; lng: number } };
    photos?: { photo_reference: string }[];
}

export interface PlaceData {
    structured_formatting: { main_text: string };
    description: string;
    place_id: string;
}