import { PetSortOptions } from "./../constants/pet.constant";
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { Pet } from "./pet.model";
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

  sortPets(criteria: string): void {
    const pets = this._pets.value;
    const sortPetFn = (a: Pet, b: Pet): number => {
      if (
        criteria === PetSortOptions.NAME ||
        criteria === PetSortOptions.KIND
      ) {
        return a[criteria].toLowerCase() > b[criteria].toLowerCase()
          ? 1
          : a[criteria].toLowerCase() === b[criteria].toLowerCase()
          ? 0
          : -1;
      } else {
        return a[criteria] > b[criteria]
          ? 1
          : a[criteria] === b[criteria]
          ? 0
          : -1;
      }
    };
    const sortedPets: Pet[] = pets.sort(sortPetFn);
    this._pets.next(sortedPets.slice());
  }
}
