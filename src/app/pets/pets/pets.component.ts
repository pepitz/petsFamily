import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

import { Pet } from "./pet.model";

import { PetsService } from "./pets.service";
@Component({
  selector: "app-pets",
  templateUrl: "./pets.component.html",
  styleUrls: ["./pets.component.scss"],
})
export class PetsComponent implements OnInit {
  pets$: Observable<Pet[]> = this.petsService.pets;
  constructor(private petsService: PetsService) {}

  ngOnInit(): void {
    this.getPets();
  }

  getPets() {
    this.petsService.fetchPets().subscribe();
  }
}
