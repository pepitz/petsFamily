import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { Pet } from "../pets/pet.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PetsService {
  private _pets: BehaviorSubject<Pet[]> = new BehaviorSubject(null);
  public readonly pets: Observable<Pet[]> = this._pets.asObservable();

  constructor(private http: HttpClient) {}

  fetchPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${environment.base_url}?_page=/1`).pipe(
      tap((pets) => {
        this._pets.next(pets);
      })
    );
  }
}
