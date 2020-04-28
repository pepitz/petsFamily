import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { Pet } from "../pet.model";
import { LinkHeader } from "../link.model";

import { PetsService } from "../pets.service";
import { SortPetsPipe } from "./../../pipes/sort-pets.pipe";

@Component({
  selector: "app-pets",
  templateUrl: "./pets-list.component.html",
  styleUrls: ["./pets-list.component.scss"],
  providers: [SortPetsPipe],
})
export class PetsListComponent implements OnInit, OnDestroy {
  pets$: Observable<Pet[]> = this.petsService.pets;
  linkControls$: Observable<LinkHeader> = this.petsService.linkControlURLs;

  sortedBy$: Observable<string> = this.petsService.sortedBy;
  sortSubs: Subscription;
  sortParam = "";

  petOptions: string[];

  constructor(private petsService: PetsService) {}

  ngOnInit(): void {
    this.loadPets();
    this.loadPetSortOptions();
    this.sortSubs = this.sortedBy$.subscribe((sorted) => {
      this.sortParam = sorted;
    });
  }

  loadPetSortOptions() {
    this.petOptions = this.petsService.getPetSortOptions();
  }

  loadPets() {
    this.petsService.fetchPets();
  }

  onSorted(option: string) {
    this.petsService.changeSortedBy(option);
  }

  onPageControlClick(link?: string) {
    this.petsService.fetchPets(link);
  }

  ngOnDestroy() {
    this.sortSubs.unsubscribe();
  }
}
