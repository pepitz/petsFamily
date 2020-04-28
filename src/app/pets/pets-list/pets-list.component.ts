import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";

import { Pet } from "../pet.model";
import { LinkHeader } from "../link.model";
import { PetSortOptions } from "../../constants/pet.constant";

import { PetsService } from "../pets.service";
import { SortPetsPipe } from "./../../pipes/sort-pets.pipe";
import { distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "app-pets",
  templateUrl: "./pets-list.component.html",
  styleUrls: ["./pets-list.component.scss"],
  providers: [SortPetsPipe],
})
export class PetsListComponent implements OnInit, OnDestroy {
  linkControls$: Observable<LinkHeader> = this.petsService.linkControlURLs;
  pets$: Observable<Pet[]> = this.petsService.pets;
  petOptions: string[] = Object.values(PetSortOptions);
  sortedBy$: Observable<string> = this.petsService.sortedBy;
  sortSubs: Subscription;
  sortParam = "";

  constructor(private petsService: PetsService) {}

  ngOnInit(): void {
    this.sortSubs = this.sortedBy$
      .pipe(distinctUntilChanged())
      .subscribe((sorted) => {
        this.sortParam = sorted;
      });
    this.loadPets();
  }

  loadPets() {
    this.petsService.fetchPets();
  }

  onSorted(option: string) {
    this.petsService.changeSortedBy(option);
    this.petsService.sortPets(option);
  }

  onPageControlClick(link?: string) {
    this.petsService.fetchPets(link);
  }

  ngOnDestroy() {
    this.sortSubs.unsubscribe();
  }
}
