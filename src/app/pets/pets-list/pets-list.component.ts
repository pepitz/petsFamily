import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { tap } from "rxjs/operators";

import { Pet } from "../pet.model";
import { LinkHeader } from "../link.model";
import { PetSortOptions } from "../../constants/pet.constant";
import { WeeekDays } from "./../../constants/weekdays.enum";

import { PetsService } from "../pets.service";
@Component({
  selector: "app-pets",
  templateUrl: "./pets-list.component.html",
  styleUrls: ["./pets-list.component.scss"],
})
export class PetsListComponent implements OnInit, OnDestroy {
  linkControls$: Observable<LinkHeader> = this.petsService.linkControlURLs;
  pets$: Observable<Pet[]> = this.petsService.pets;
  petOptions: string[] = Object.values(PetSortOptions);
  sortedOption: string;
  favoritePet: Pet;
  subscription: Subscription;

  constructor(private petsService: PetsService) {}

  ngOnInit(): void {
    this.loadPets();
    this.subscription = this.pets$
      .pipe(tap((petsChanged) => console.log("petsChanged", petsChanged)))
      .subscribe();
  }

  loadPets() {
    this.petsService.fetchPets();
  }

  onSorted(event: string) {
    this.sortedOption = event;
    this.petsService.sortPets(this.sortedOption);
  }

  onPageControlClick(link?: string) {
    this.petsService.fetchPets(link);
  }

  onShowFavoritePet(pets: Pet[]): void {
    if (this.favoritePet) {
      return;
    }
    const calendarPets = pets.slice(0, 7);
    const favoritePet = calendarPets[this.getCurrentDay()];
    console.log("favorite pet: ", favoritePet);
    this.favoritePet = favoritePet;
  }

  getCurrentDay(): number {
    const date = new Date();
    return date.getDay();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
