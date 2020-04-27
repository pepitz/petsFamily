import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PetsListComponent } from "./pets/pets-list/pets-list.component";
import { PetDetailComponent } from "./pets/pet-detail/pet-detail/pet-detail.component";
import { FavoritePetComponent } from "./pets/favorite-pet/favorite-pet.component";
import { PetsSortComponent } from "./pets/pets-sort/pets-sort.component";

@NgModule({
  declarations: [
    AppComponent,
    PetsListComponent,
    PetDetailComponent,
    FavoritePetComponent,
    PetsSortComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
