export interface Location {
  lat: number;
  lng: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  location: Location;
}

export interface Contact {
  site: string;
  email: string;
  phone: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  contact: Contact;
  address: Address;
}

export type SortOption = 'rating' | 'alphabetical' | null;