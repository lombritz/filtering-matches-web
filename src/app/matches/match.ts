import { City } from './city';

export class Match {
  id: string;
  displayName: string;
  age: number;
  jobTitle: string;
  heightInCm: number;
  city: City;
  distanceInKm: number;
  mainPhoto: string;
  compatibilityScore: number;
  contactsExchanged: number;
  favourite: boolean;
  religion: string;
}
