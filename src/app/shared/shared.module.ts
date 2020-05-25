import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SortPetsPipe } from "./pipes/sort-pets.pipe";
import { LoaderComponent } from "./loader/loader.component";

@NgModule({
  declarations: [SortPetsPipe, LoaderComponent],
  imports: [CommonModule],
  exports: [SortPetsPipe, LoaderComponent, CommonModule],
})
export class SharedModule {}
