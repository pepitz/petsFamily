import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PetsListComponent } from "./pets/pets-list/pets-list.component";
import { PetDetailComponent } from "./pets/pet-detail/pet-detail/pet-detail.component";
import { FavoritePetComponent } from "./pets/favorite-pet/favorite-pet.component";

@NgModule({
  declarations: [
    AppComponent,
    PetsListComponent,
    PetDetailComponent,
    FavoritePetComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
