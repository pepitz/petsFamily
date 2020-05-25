import { NgModule } from "@angular/core";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { PetsInterceptorService } from "./pets/pets-interceptor.service";

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PetsInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
