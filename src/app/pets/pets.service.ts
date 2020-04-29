import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { tap } from "rxjs/operators";

import { PetSortOptions } from "../shared/constants/pet.constant";
import { LinkHeader } from "./link.model";
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

  fetchPets(pageURL?: string): Subscription {
    const defaultURL = `${environment.base_url}?_page=/1`;
    const URL = pageURL ? pageURL : defaultURL;

    return this.http
      .get<Pet[]>(URL, { observe: "response" })
      .pipe(
        tap((response) => {
          let linkObj = this.getLinkHeader(response.headers.get("Link"));

          this._linkControlURLs.next(linkObj);
          this._pets.next(response.body);
        })
      )
      .subscribe();
  }

  getPet(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${environment.base_url}${id}`);
  }

  getPetSortOptions(): string[] {
    return Object.values(PetSortOptions);
  }

  getLinkHeader(header: string) {
    if (header.length == 0) {
      return;
    }

    let parts = header.split(",");
    let links = {};
    parts.forEach((part: string) => {
      let section = part.split(";");
      const url = section[0].replace(/<(.*)>/, "$1").trim();
      const name = section[1].replace(/rel="(.*)"/, "$1").trim();
      links[name] = url;
    });
    return links;
  }

  changeSortedBy(option: string) {
    this._sortedBy.next(option);
  }
}
