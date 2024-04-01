import { ICategory } from "@/domain/types";
import { useCategoriesContext } from "../data/contexts";

export const useCategories = () => {};

export const useMainCategories = () => {
  return useCategoriesContext().sort(
    (a, b) => (a.order ?? -1) - (b.order ?? -1)
  );
};
