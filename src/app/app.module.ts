import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PetsListComponent } from "./pets/pets-list/pets-list.component";
import { PetDetailComponent } from "./pets/pet-detail/pet-detail/pet-detail.component";
import { FavoritePetComponent } from "./pets/favorite-pet/favorite-pet.component";
import { PetsSortComponent } from "./pets/pets-sort/pets-sort.component";
import { PetsInterceptorService } from "./pets/pets-interceptor.service";
import { ListControlsComponent } from "./pets/pets-list/list-controls/list-controls.component";
import { SortPetsPipe } from './pipes/sort-pets.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PetsListComponent,
    PetDetailComponent,
    FavoritePetComponent,
    PetsSortComponent,
    ListControlsComponent,
    SortPetsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PetsInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
