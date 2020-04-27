import { PetDetailComponent } from "./pets/pet-detail/pet-detail/pet-detail.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PetsComponent } from "./pets/pets/pets.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/pets",
    pathMatch: "full",
  },
  {
    path: "pets",
    children: [
      { path: "", component: PetsComponent },
      {
        path: ":id",
        component: PetDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
