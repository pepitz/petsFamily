import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { Pet } from "../pet.model";
import { PetSortOptions } from "../../constants/pet.constant";

import { PetsService } from "../pets.service";
import { tap } from "rxjs/operators";
@Component({
  selector: "app-pets",
  templateUrl: "./pets-list.component.html",
  styleUrls: ["./pets-list.component.scss"],
})
export class PetsListComponent implements OnInit, OnDestroy {
  pets$: Observable<Pet[]> = this.petsService.pets;
  petOptions: string[] = Object.values(PetSortOptions);
  sortedOption: string;
  subscription: Subscription;

  constructor(private petsService: PetsService) {}

  ngOnInit(): void {
    this.loadPets();
    this.subscription = this.pets$
      .pipe(tap((petsChanged) => console.log("petsChanged", petsChanged)))
      .subscribe();
  }

  loadPets() {
    this.petsService.fetchPets().subscribe();
  }

  onSorted(event: string) {
    this.sortedOption = event;
    this.petsService.sortPets(this.sortedOption);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
