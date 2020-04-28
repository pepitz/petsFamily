import { Subscription } from "rxjs";
import { PetsService } from "./../../pets.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Pet } from "../../pet.model";

@Component({
  selector: "app-pet-detail",
  templateUrl: "./pet-detail.component.html",
  styleUrls: ["./pet-detail.component.scss"],
})
export class PetDetailComponent implements OnInit {
  subscription: Subscription;
  id: number;
  pet: Pet;

  constructor(
    private petsService: PetsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: ParamMap) => {
      this.id = params["id"];
      this.subscription = this.petsService
        .getPet(this.id)
        .subscribe((pet) => (this.pet = pet));
    });
  }
}
