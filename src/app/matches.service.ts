import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatchesRequest } from './matches/matches-request';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  private REST_API_SERVER = 'http://localhost:8080/api/matches';

  constructor(private httpClient: HttpClient) { }

  public fetchFilteredMatches(request: MatchesRequest) {
    return this.httpClient.post(this.REST_API_SERVER, request);
  }

}
