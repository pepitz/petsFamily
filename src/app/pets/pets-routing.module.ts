import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PetsListComponent } from "./pets-list/pets-list.component";
import { PetDetailComponent } from "./pet-detail/pet-detail/pet-detail.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "pets",
    pathMatch: "full",
  },
  { path: "pets", component: PetsListComponent },
  {
    path: ":id",
    component: PetDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsRoutingModule {}
