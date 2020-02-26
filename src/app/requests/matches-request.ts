export class MatchesRequest {
  coordinates: number[];
  distanceInKm: number;
  favourite: boolean;
  hasPhoto: boolean;
  inContact: boolean;
  rangeAge: number[];
  rangeCompatibilityScore: number[];
  rangeHeightInCm: number[];

  constructor(coordinates: number[], distanceInKm: number, favourite: boolean, hasPhoto: boolean, inContact: boolean, rangeAge: number[],
              rangeCompatibilityScore: number[], rangeHeightInCm: number[]) {
    this.coordinates = coordinates;
    this.distanceInKm = distanceInKm;
    this.favourite = favourite;
    this.hasPhoto = hasPhoto;
    this.inContact = inContact;
    this.rangeAge = rangeAge;
    this.rangeCompatibilityScore = rangeCompatibilityScore;
    this.rangeHeightInCm = rangeHeightInCm;
  }
}
