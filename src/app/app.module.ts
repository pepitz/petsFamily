import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { PetsModule } from "./pets/pets.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { PetsInterceptorService } from "./pets/pets-interceptor.service";
import { LoaderComponent } from "./shared/loader/loader.component";

@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,;
    HttpClientModule,
    PetsModule,
    AppRoutingModule,
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
