import { PageNotFoundComponent } from "./error/page-not-found/page-not-found.component";
import { PetDetailComponent } from "./pets/pet-detail/pet-detail/pet-detail.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PetsListComponent } from "./pets/pets-list/pets-list.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/pets",
    pathMatch: "full",
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
