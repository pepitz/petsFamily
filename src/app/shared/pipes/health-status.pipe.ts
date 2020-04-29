import { Pipe, PipeTransform } from "@angular/core";
import { Pet } from "src/app/pets/pet.model";

@Pipe({
  name: "healthStatus",
})
export class HealthStatusPipe implements PipeTransform {
  transform(value: number, pet: Pet): string {
    let result = "";
    if (pet.kind === "cat" || pet.kind === "dog") {
      if (value >= 3 || value <= 5) {
        result = "healthy";
      } else if (value < 2 || value > 5) {
        result = "unhealthy";
      } else if (value === 2 || value === 3) {
        result = "very healthy";
      }
    } else if (pet.kind === "cat" && pet.number_of_lives === 1) {
      result = "unhealthy";
    }
    return result;
  }
}
