import { Component, OnInit, Input } from "@angular/core";
import { Pet } from "../pet.model";

@Component({
  selector: "app-favorite-pet",
  templateUrl: "./favorite-pet.component.html",
  styleUrls: ["./favorite-pet.component.scss"],
})
export class FavoritePetComponent implements OnInit {
  @Input() pets: Pet[] = [];
  favoritePet: Pet;

  constructor() {}

  ngOnInit(): void {}

  onShowFavoritePet(pets: Pet[]): void {
    if (this.favoritePet) {
      return;
    }
    const calendarPets = pets.slice(0, 7);
    const favoritePet = calendarPets[this.getCurrentDay()];
    this.favoritePet = favoritePet;
  }

  getCurrentDay(): number {
    const date = new Date();
    return date.getDay();
  }
}
