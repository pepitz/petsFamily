import { LinkHeader } from "./link.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { Pet } from "./pet.model";
import { environment } from "src/environments/environment";
import { sortPetFn } from "../utilities/sortPetFn";

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

  fetchPets(pageURL?: string) {
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
    const sortedPets: Pet[] = pets.sort((a, b) => sortPetFn(a, b, criteria));
    this._pets.next(sortedPets.slice());
    this.changeSortedBy(criteria);
  }

  changeSortedBy(option: string) {
    this._sortedBy.next(option);
  }

}
