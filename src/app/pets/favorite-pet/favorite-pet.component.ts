import { Component, OnInit, Input } from "@angular/core";
import { Pet } from "../pet.model";

import { getCurrentDay } from "../../shared/utilities/currentDayNumberFn";

getCurrentDay;

@Component({
  selector: "app-favorite-pet",
  templateUrl: "./favorite-pet.component.html",
  styleUrls: ["./favorite-pet.component.scss"],
})
export class FavoritePetComponent implements OnInit {
  @Input() pets: Pet[] = [];
  favoritePet: Pet;
  isVisible = false;

  constructor() {}

  ngOnInit() {
    this.loadPetofTheDay(this.pets);
  }

  loadPetofTheDay(pets: Pet[]) {
    if (this.favoritePet) {
      return;
    }
    const calendarPets = pets.slice(0, 7);
    const favoritePet = calendarPets[getCurrentDay()];
    this.favoritePet = favoritePet;
  }

  onShow(): void {
    this.isVisible = !this.isVisible;
  }
}
