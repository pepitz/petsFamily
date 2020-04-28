import { Pet } from "../../pets/pet.model";
import { PetSortOptions } from "../constants/pet.constant";

export const sortPetFn = (
  a: Pet,
  b: Pet,
  sortCriteria: string,
  options = PetSortOptions
): number => {
  if (sortCriteria === options.NAME || sortCriteria === options.KIND) {
    return a[sortCriteria].toLowerCase() > b[sortCriteria].toLowerCase()
      ? 1
      : a[sortCriteria].toLowerCase() === b[sortCriteria].toLowerCase()
      ? 0
      : -1;
  } else {
    return a[sortCriteria] > b[sortCriteria]
      ? 1
      : a[sortCriteria] === b[sortCriteria]
      ? 0
      : -1;
  }
};
