import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";

import { Pet } from "../pet.model";
import { LinkHeader } from "../link.model";
import { PetSortOptions } from "../../constants/pet.constant";

import { PetsService } from "../pets.service";
@Component({
  selector: "app-pets",
  templateUrl: "./pets-list.component.html",
  styleUrls: ["./pets-list.component.scss"],
})
export class PetsListComponent implements OnInit {
  linkControls$: Observable<LinkHeader> = this.petsService.linkControlURLs;
  pets$: Observable<Pet[]> = this.petsService.pets;
  petOptions: string[] = Object.values(PetSortOptions);

  constructor(private petsService: PetsService) {}

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets() {
    this.petsService.fetchPets();
  }

  onSorted(option: string) {
    this.petsService.sortPets(option);
  }

  onPageControlClick(link?: string) {
    this.petsService.fetchPets(link);
  }
}
