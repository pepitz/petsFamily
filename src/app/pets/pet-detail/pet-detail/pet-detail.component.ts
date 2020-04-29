import { HealthStatusPipe } from "./../../../shared/pipes/health-status.pipe";
import { Subscription } from "rxjs";
import { PetsService } from "./../../pets.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Pet } from "../../pet.model";

@Component({
  selector: "app-pet-detail",
  templateUrl: "./pet-detail.component.html",
  styleUrls: ["./pet-detail.component.scss"],
  providers: [HealthStatusPipe],
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
        .subscribe((pet: Pet) => {
          this.pet = pet;
        });
    });
  }

  calculateHealth(petData: Pet): string {
    let health: number = 0;
    let result = "";
    health = Math.floor(petData.weight / (petData.height * petData.length));

    if (health === 4 || health === 5) {
      result = "healthy";
    } else if (
      health < 2 ||
      health > 5 ||
      (petData.kind === "cat" && petData.number_of_lives === 1)
    ) {
      result = "unhealthy";
    } else if (health === 2 || health === 3) {
      result = "very healthy";
    }

    return result;
  }
}
