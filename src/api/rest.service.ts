import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) {

  }

  public getAuswahlliste(name: string) {
    return this.httpClient.get(`https://localhost:5001/api/AuswahlListen/api/AuswahlListen/${name}`);
  }
}
