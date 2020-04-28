import { LinkHeader } from "./link.model";
import { PetSortOptions } from "./../constants/pet.constant";
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { Pet } from "./pet.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PetsService {
  private _pets: BehaviorSubject<Pet[]> = new BehaviorSubject(null);
  public readonly pets: Observable<Pet[]> = this._pets.asObservable();

  private _sortedBy: BehaviorSubject<string> = new BehaviorSubject(null);
  public readonly sortedBy: Observable<string> = this._sortedBy.asObservable();

  private _linkControlURLs: BehaviorSubject<LinkHeader> = new BehaviorSubject(
    null
  );
  public readonly linkControlURLs = this._linkControlURLs.asObservable();

  constructor(private http: HttpClient) {}

  fetchPets() {
    return this.http
      .get<Pet[]>(`${environment.base_url}?_page=/1`, { observe: "response" })
      .pipe(
        tap((response) => {
          let linkObj = this.getLinkHeader(response.headers.get("Link"));

          this._linkControlURLs.next(linkObj);
          this._pets.next(response.body);
        })
      );
  }

  getLinkHeader(header) {
    if (header.length == 0) {
      return;
    }

    let parts = header.split(",");
    var links = {};
    parts.forEach((p) => {
      let section = p.split(";");
      var url = section[0].replace(/<(.*)>/, "$1").trim();
      var name = section[1].replace(/rel="(.*)"/, "$1").trim();
      links[name] = url;
    });
    return links;
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
    this._sortedBy.next(criteria);
  }
}
