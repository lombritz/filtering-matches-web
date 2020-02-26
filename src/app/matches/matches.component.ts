import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { FormBuilder, FormControl } from '@angular/forms';

import { MatchesService } from '../matches.service';
import { MatchesRequest } from '../requests/matches-request';
import { Match } from '../models/match';


@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: Match[] = [];
  loading = false;
  currentLocation = [ 51.509865, -0.118092 ]; // assume user fixed location
  filterForm;
  hasPhotoIndeterminate = true;
  inContactIndeterminate = true;
  favouriteIndeterminate = true;

  ageRanges = [
    { label: '18 - 35', min: 18, max: 35 },
    { label: '36 - 50', min: 36, max: 50 },
    { label: '51 - 65', min: 51, max: 65 },
    { label: '66 - 80', min: 66, max: 80 },
    { label: '81 - 95', min: 81, max: 95 },
    { label: '> 95',  min: 95, max: undefined }
  ];

  scoreRanges = [
    { label: '< 10%', min: 0.01, max: 0.09 },
    { label: '10% - 19%', min: 0.1, max: 0.19 },
    { label: '20% - 29%', min: 0.2, max: 0.29 },
    { label: '30% - 39%', min: 0.3, max: 0.39 },
    { label: '40% - 49%', min: 0.4, max: 0.49 },
    { label: '50% - 59%', min: 0.5, max: 0.59 },
    { label: '60% - 69%', min: 0.6, max: 0.69 },
    { label: '70% - 79%', min: 0.7, max: 0.79 },
    { label: '80% - 89%', min: 0.8, max: 0.89 },
    { label: '> 90%',  min: 0.9, max: 0.99 }
  ];

  heightRanges = [
    { label: '135cm - 149cm', min: 135, max: 149 },
    { label: '150cm - 164cm', min: 150, max: 164 },
    { label: '165cm - 179cm', min: 165, max: 179 },
    { label: '180cm - 194cm', min: 180, max: 194 },
    { label: '195cm - 210cm', min: 195, max: 210 },
    { label: '> 210cm',  min: 210, max: undefined }
  ];

  private static buildFormFields() {
    return {
      distanceInKm: null,
      favourite: undefined,
      hasPhoto: undefined,
      inContact: undefined,
      ageIdx: null,
      scoreIdx: null,
      heightIdx: null,
      ageMin: null,
      ageMax: null,
      compatibilityScoreMin: null,
      compatibilityScoreMax: null,
      heightMin: null,
      heightMax: null
    };
  }

  constructor(
    private matchesService: MatchesService,
    private formBuilder: FormBuilder,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('check',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/check.svg'));
    this.filterForm = formBuilder.group(MatchesComponent.buildFormFields());
  }

  ngOnInit() {
    this.loading = true;
    this.matchesService.fetchFilteredMatches(null)
      .subscribe((data: any[]) => {
        this.matches = data;
        this.loading = false;
      });
  }

  reloadMatches() {
    console.log(this.filterForm.value);
    this.loading = true;
    // verify age range input
    const ageIdx = this.filterForm.ageIdx;
    const ageSelected = typeof ageIdx !== 'undefined';
    let ageMin = null;
    let ageMax = null;
    if (ageSelected) {
      ageMin = this.ageRanges[ageIdx].min;
      ageMax = this.ageRanges[ageIdx].max;
    }
    // verify score range input
    const scoreIdx = this.filterForm.scoreIdx;
    const scoreSelected = typeof scoreIdx !== 'undefined';
    let scoreMin = null;
    let scoreMax = null;
    if (scoreSelected) {
      scoreMin = this.scoreRanges[scoreIdx].min;
      scoreMax = this.scoreRanges[scoreIdx].max;
    }
    // verify height range input
    const heightIdx = this.filterForm.heightIdx;
    const heightSelected = typeof heightIdx !== 'undefined';
    let heightMin = null;
    let heightMax = null;
    if (heightSelected) {
      heightMin = this.heightRanges[heightIdx].min;
      heightMax = this.heightRanges[heightIdx].max;
    }
    const request: MatchesRequest = new MatchesRequest(
      this.currentLocation,
      this.filterForm.distanceInKm,
      this.filterForm.favourite,
      this.filterForm.hasPhoto,
      this.filterForm.inContact,
      ageSelected ? [ ageMin, ageMax ] : null,
      scoreSelected ? [ scoreMin, scoreMax ] : null,
      heightSelected ? [ heightMin, heightMax ] : null
    );
    this.matchesService.fetchFilteredMatches(request)
      .subscribe((data: any[]) => {
        this.matches = data;
        this.loading = false;
      });
  }

  resetFilter() {
    this.hasPhotoIndeterminate = true;
    this.inContactIndeterminate = true;
    this.favouriteIndeterminate = true;
    this.filterForm = this.formBuilder.group(MatchesComponent.buildFormFields());
    this.reloadMatches();
  }

}
