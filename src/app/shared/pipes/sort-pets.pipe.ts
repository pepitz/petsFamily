import { sortPetFn } from "../../utilities/sortPetFn";
import { Pipe, PipeTransform } from "@angular/core";
import { Pet } from "../../pets/pet.model";

@Pipe({
  name: "sortPets",
})
export class SortPetsPipe implements PipeTransform {
  transform(value: Pet[], args: string): Pet[] {
    let result = value;
    if (args) {
      result = value.sort((a, b) => sortPetFn(a, b, args));
    }
    return result.slice();
  }
}
