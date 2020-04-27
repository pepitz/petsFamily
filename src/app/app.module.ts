import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PetsComponent } from './pets/pets/pets.component';
import { PetDetailComponent } from './pets/pet-detail/pet-detail/pet-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PetsComponent,
    PetDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
