import { PetDetailComponent } from "./pet-detail/pet-detail/pet-detail.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { PetsListComponent } from "./pets-list/pets-list.component";
import { FavoritePetComponent } from "./favorite-pet/favorite-pet.component";
import { PetsSortComponent } from "./pets-sort/pets-sort.component";
import { ListControlsComponent } from "./pets-list/list-controls/list-controls.component";
import { SortPetsPipe } from "../shared/pipes/sort-pets.pipe";
import { PetsRoutingModule } from "./pets-routing.module";

@NgModule({
  declarations: [
    PetsListComponent,
    PetDetailComponent,
    FavoritePetComponent,
    PetsSortComponent,
    ListControlsComponent,
    SortPetsPipe,
  ],
  imports: [RouterModule, CommonModule, ReactiveFormsModule, PetsRoutingModule],
  exports: [
    PetsListComponent,
    PetDetailComponent,
    FavoritePetComponent,
    PetsSortComponent,
    ListControlsComponent,
    SortPetsPipe,
  ],
})
export class PetsModule {}
