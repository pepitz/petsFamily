import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { Pet } from "../pet.model";

import { PetsService } from "../pets.service";
@Component({
  selector: "app-pets",
  templateUrl: "./pets-list.component.html",
  styleUrls: ["./pets-list.component.scss"],
})
export class PetsListComponent implements OnInit {
  pets$: Observable<Pet[]> = this.petsService.pets;
  constructor(private petsService: PetsService) {}

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets() {
    this.petsService.fetchPets().subscribe();
  }
}
