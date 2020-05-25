import { PageNotFoundComponent } from "./error/page-not-found/page-not-found.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/pets",
    pathMatch: "full",
  },
  {
    path: "pets",
    loadChildren: () => import("./pets/pets.module").then((m) => m.PetsModule),
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
